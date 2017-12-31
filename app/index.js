import bodyParser from 'body-parser';
import request from 'request';
import verifyRequestSignature from './utils/verifyRequestSignature';
import render from './bot';

class UIBOT {
  constructor(server, credentials, configs){
    this.credentials = credentials;
    this.cfg = Object.assign({
      get_start_path: 'BOTPATH:/newuser'
    }, configs);
    this.server = server;
    this.server.use(bodyParser.json({
      verify: verifyRequestSignature(this)
    }));
    this.initRoutes()
  }

  initRoutes(){
    // token verification
    this.server.get('/webhook', this.webhookGetController.bind(this));
    // all message routes
    this.server.post('/webhook', this.webhookPostController.bind(this));
  }

  initMessenger(){
    // send menu
    this.log('Setting menu for the bot');
    this.profile(Object.assign({
      get_started: {
        payload: this.cfg.get_start_path
      }
    }, render('/menu')));
  }

  start() {
    this.server.set('port', process.env.PORT || 5000);
    this.server.listen(this.server.get('port'), () => {
      this.log('Node server is running on port', this.server.get('port'));
      this.initMessenger();
    });
  }

  render(path, props){
    this.log('Render:', path, props);
    // typing on
    this.send(
      render('/typing', { recipient: props.recipient, typing: true })
    );
    let res = render(path, props);
    render(path, props);
    this.log('||| render:', res);
    this.send(res);

    // typing off
    this.send(
      render('/typing', { recipient: props.recipient, typing: false })
    );
  }

  webhookGetController(req, res){
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === this.credentials.VALIDATION_TOKEN) {
        this.log("Validated webhook");
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
        pageEntry.messaging.forEach((messagingEvent) => {
          if (messagingEvent.optin) {
            // receivedAuthentication(messagingEvent);
            const senderID = messagingEvent.sender.id;
            const recipientID = messagingEvent.recipient.id;
            const timeOfAuth = messagingEvent.timestamp;
            const passThroughParam = messagingEvent.optin.ref;

            this.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);
            this.render('/authsucess', { recipient: messagingEvent.sender })
          } else if (messagingEvent.message) {
            this.messageHandler(messagingEvent);
          } else if (messagingEvent.delivery) {
            const delivery = messagingEvent.delivery;
            const messageIDs = delivery.mids;
            const watermark = delivery.watermark;

            if (messageIDs) {
              messageIDs.forEach((messageID) => this.log("Received delivery confirmation for message ID: %s", messageID));
            }

            this.log("All message before %d were delivered.", watermark);
          } else if (messagingEvent.postback) {
            this.postbackHandler(messagingEvent);
          } else if (messagingEvent.read) {
            // All messages before watermark (a timestamp) or sequence have been seen.
            const watermark = messagingEvent.read.watermark;
            const sequenceNumber = messagingEvent.read.seq;

            this.log("Received message read event for watermark %d and sequence number %d", watermark, sequenceNumber);
          } else if (messagingEvent.account_linking) {
            const senderID = messagingEvent.sender.id;
            const status = messagingEvent.account_linking.status;
            const authCode = messagingEvent.account_linking.authorization_code;

            this.log("Received account link event with for user %d with status %s and auth code %s ", senderID, status, authCode);
          } else if(typeof messagingEvent['policy-enforcement'] !== 'undefined'){
            let policy = messagingEvent['policy-enforcement'];
            this.log("Policy-Enforcement: ", policy.action, policy.reason);
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
    //check if it's bot path
    if (payload.substring(0, 8) == "BOTPATH:") {
      let botpath = payload.substring(8);
      this.render(botpath, { recipient: sender })
    }else{
      this.render('/message', { recipient: sender, text: payload })
    }
  }

  postbackHandler(event){
    this.logPostback(event);
    this.navigate(event.postback.payload, event.sender);
  }

  messageHandler(event){
    this.logMessage(event);
    const message = event.message;

    // special cases
    if (message.is_echo) {
      this.log("Received echo for message", message);
      return this.render('/echo', { recipient: event.sender, ...message })
    } else if (message.quick_reply) {
      this.log("Quick reply for message %s with payload %s", message.mid, message.quick_reply);
      return this.navigate(message.quick_reply.payload, event.sender);
    }

    if (message.text) {
      return this.render('/message', { recipient: event.sender, text: message.text });
    } else if (message.attachments) {
      return this.render('/attachment', { recipient: event.sender, text: message.text });
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
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: data
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        if (body.message_id) {
          this.log("Successfully sent message with id %s to recipient %s", body.message_id, body.recipient_id);
        } else {
          this.log("Successfully called Send API for recipient %s", body.recipient_id);
        }
      } else {
        this.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
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