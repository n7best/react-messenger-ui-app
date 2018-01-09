import 'babel-polyfill';
import bodyParser from 'body-parser';
import request from 'request';
import verifyRequestSignature from './utils/verifyRequestSignature';
import BotEmitter from './utils/botEmitter';
import { getRepliesByKey } from './db';

class UIBOT extends BotEmitter{
  constructor(server, credentials, configs){
    super();
    this.credentials = credentials;
    this.cfg = Object.assign({
      debug: process.env.NODE_ENV === 'development',
      path_prefix: 'BOTPATH:',
      get_start_path: '/newuser',
      echo_path: '/echo',
      message_path: '/message',
      attachment_path: '/attachment',
      webhook_path: '/webhook',
      menu_path: '/menu',
      authsucess_path: '/authsuccess',
      typing_path: '/typing',
      sendApiUrl: 'https://graph.facebook.com/v2.6/me/messages',
      profileApiUrl: 'https://graph.facebook.com/v2.6/me/messenger_profile',
      profileConfig: {},
      sendTypingOnRender: true,
      app: null
    }, configs);
    this.server = server;
    this.server.use(bodyParser.json({
      verify: verifyRequestSignature(this)
    }));

    // debug
    if(this.cfg.debug){
      this.initDebug();
    }

    this.initRoutes()
  }

  initDebug(){
    this.on('beforeRender', (path, props)=> this.log('Render:', path, props));
    this.on('afterRender', json => this.log('Render Reply:', JSON.stringify(json, undefined, 4)));
    this.on('afterStart', port=>this.log('Node server is running on port', port))
    this.on('sendSuccess', (response, body) => {
      if (body.message_id) {
        this.log("Successfully sent message with id %s to recipient %s", body.message_id, body.recipient_id);
      } else {
        this.log("Successfully called Send API for recipient %s", body.recipient_id);
      }
    })
    this.on('sendError', (response, body) => this.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error))
    this.on('echo', message =>this.log("Received echo for message", message));
    this.on('quickReply', message =>  this.log("Quick reply for message %s with payload %s", message.mid, message.quick_reply) )
    this.on('messageEvent', event=>this.logMessage(event));
    this.on('optinEvent', event=>{
      const senderID = event.sender.id;
      const recipientID = event.recipient.id;
      const timeOfAuth = event.timestamp;
      const passThroughParam = event.optin.ref;

      this.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);
    })

    this.on('readEvent', event => {
      const watermark = event.read.watermark;
      const sequenceNumber = event.read.seq;

      this.log("Received message read event for watermark %d and sequence number %d", watermark, sequenceNumber);
    })

    this.on('delivery', delivery => this.log("Received delivery confirmation for message ID: %s", delivery.messageID) )
    this.on('postbackEvent', event=> this.logPostback(event));
    this.on('validateToken', token => this.log("Validated webhook"));
    this.on('policy', policy => this.log("Policy-Enforcement: ", policy.action, policy.reason))
    this.on('accountLinkEvent', event=> {
      const senderID = event.sender.id;
      const status = event.account_linking.status;
      const authCode = event.account_linking.authorization_code;

      this.log("Received account link event with for user %d with status %s and auth code %s ", senderID, status, authCode);
    })
  }

  initRoutes(){
    if(!this.cfg.app) throw new Error('not app is provided');

    // token verification
    this.server.get(this.cfg.webhook_path, this.webhookGetController.bind(this));
    // all message routes
    this.server.post(this.cfg.webhook_path, this.webhookPostController.bind(this));

    this.emit('initRoutes');
  }

  initMessenger(){
    let configs = Object.assign({
      get_started: {
        payload: this.cfg.path_prefix + this.cfg.get_start_path
      }
    }, this.cfg.profileConfig, this.cfg.app(this.cfg.menu_path))

    this.emit('beforeInitMessenger', configs)
    this.profile(configs);
  }

  async start() {
    this.server.set('port', process.env.PORT || 5000);
    await this.emitSync('beforeStart');
    // start server
    this.server.listen(this.server.get('port'), () => {
      this.initMessenger();

      this.emit('afterStart', this.server.get('port'));
    });
  }

  render(path, props){
    // typing on
    if(this.cfg.sendTypingOnRender){
      this.send(
        this.cfg.app(this.cfg.typing_path, { recipient: props.recipient, typing: true })
      );
    }

    this.emit('beforeRender', path, props)
    let res = this.cfg.app(path, props);
    this.emit('afterRender', res)

    this.send(res);

    // typing off
    if(this.cfg.sendTypingOnRender){
      this.send(
        this.cfg.app(this.cfg.typing_path, { recipient: props.recipient, typing: false })
      );
    }
  }

  webhookGetController(req, res){
    if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === this.credentials.VALIDATION_TOKEN) {
      this.emit('validateToken', req.query['hub.verify_token']);
      res.status(200).send(req.query['hub.challenge']);
    } else {
      this.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
  }

  webhookPostController(req, res){
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object == 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach((pageEntry) => {
        // Iterate over each messaging event
        pageEntry.messaging.forEach(async (messagingEvent) => {
          if (messagingEvent.optin) {
            // receivedAuthentication(messagingEvent);
            this.optinHandler(messagingEvent);
          } else if (messagingEvent.message) {
            this.messageHandler(messagingEvent);
          } else if (messagingEvent.delivery) {
            this.deliveryHanlder(messagingEvent);
          } else if (messagingEvent.postback) {
            this.postbackHandler(messagingEvent);
          } else if (messagingEvent.read) {
            this.readHandler(messagingEvent);
          } else if (messagingEvent.account_linking) {
            this.accountLinkingHanlder(messagingEvent);
          } else if(typeof messagingEvent['policy-enforcement'] !== 'undefined'){
            this.policyHandler(messagingEvent);
          } else {
            this.log("Webhook received unknown messagingEvent: ", messagingEvent);
          }
        });
      });

      // must sent 200 to recongnize received
      res.sendStatus(200);
    }
  }

  navigate(payload, sender){
    this.emit('navigate', payload, sender);
    //check if it's bot path
    if (payload.substring(0, 8) == this.cfg.path_prefix) {
      let botpath = payload.substring(8);
      this.render(botpath, { recipient: sender })
    }else{
      this.render(this.cfg.message_path, { recipient: sender, text: payload })
    }
  }

  async policyHandler(event){
    let policy = event['policy-enforcement'];
    await this.emitSync('policy', policy)
  }

  async accountLinkingHanlder(event){
    await this.emitSync('accountLinkEvent', event);
  }

  async postbackHandler(event){
    await this.emitSync('postbackEvent', event);
    this.navigate(event.postback.payload, event.sender);
  }

  async deliveryHanlder(event){
    const delivery = event.delivery;
    const messageIDs = delivery.mids;
    const watermark = delivery.watermark;

    if (messageIDs) {
      messageIDs.forEach(async(messageID) => await this.emitSync('delivery', delivery));
    }

    this.log("All message before %d were delivered.", watermark);
  }

  async readHandler(event){
    await this.emitSync('readEvent', event);
  }

  async optinHandler(event){
    await this.emitSync('optinEvent', event);
    this.render(this.cfg.authsucess_path, { recipient: event.sender, ...event.optin })
  }

  async messageHandler(event){
    await this.emitSync('messageEvent', event);
    const message = event.message;

    // special cases
    if (message.is_echo) {
      await this.emitSync('echo', message)
      return this.render(this.cfg.echo_path, { recipient: event.sender, ...message })
    } else if (message.quick_reply) {
      await this.emitSync('quickReply', message)
      return this.navigate(message.quick_reply.payload, event.sender);
    }

    if (message.text) {
      let autoReply = await getRepliesByKey(message.text.replace(/[^\w\s]/gi, '').trim().toLowerCase());

      if(autoReply){
        return this.render('/editorreply', { recipient: event.sender, srcCode: autoReply.response });
      }

      await this.emitSync('message', message)

      return this.render(this.cfg.message_path, { recipient: event.sender, text: message.text });
    } else if (message.attachments) {
      return this.render(this.cfg.attachment_path, { recipient: event.sender, text: message.text });
    }
  }

  logMessage(event){
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;

    this.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage, JSON.stringify(message));
  }

  logPostback(event){
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const payload = event.postback.payload;

    this.log("Received postback for user %d and page %d at %d with postback:", senderID, recipientID, timeOfMessage, JSON.stringify(payload));
  }

  log(...args){
    console.log(...args);
  }

  error(...args){
    console.error(...args);
  }

  send(data, form = false) {
    this.emit('beforeSend', data, form)
    request({
      uri: this.cfg.sendApiUrl,
      qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: data
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        this.emit('sendSuccess', response, body)
      } else {
        this.emit('sendError', response, body)
      }
    });
  }

  profile(data) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
      qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: data
    }, (error, response, body) => {
      if (!error && response.statusCode == 200 && body.result === 'success') {
        this.log("Successfully update profile with", data);
      } else {
        this.error("Failed calling Profile API", response.statusCode, response.statusMessage, body.error);
      }
    });
  }
}

export default UIBOT;