import bodyParser from 'body-parser';
import request from 'request';
import verifyRequestSignature from './utils/verifyRequestSignature';
import render from './views';

class UIBOT {
  constructor(server, credentials){
    this.credentials = credentials;
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

  start() {
    this.server.set('port', process.env.PORT || 5000);
    this.server.listen(this.server.get('port'), () => {
      this.log('Node server is running on port', this.server.get('port'));
    });
  }

  render(path, props){
    this.log('Render:', path, props);
    let res = render(path, props);
    this.log('||| render:', res);
    this.send(res);
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
          } else if (messagingEvent.message) {
            this.messageHandler(messagingEvent);
          } else if (messagingEvent.delivery) {
            // receivedDeliveryConfirmation(messagingEvent);
          } else if (messagingEvent.postback) {
            // receivedPostback(messagingEvent);
          } else if (messagingEvent.read) {
            // receivedMessageRead(messagingEvent);
          } else if (messagingEvent.account_linking) {
            // receivedAccountLink(messagingEvent);
          } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
          }
        });
      });

      // must sent 200 to recongnize received
      res.sendStatus(200);
    }
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
      return this.render('/quickreply', { recipient: event.sender, ...message.quick_reply })
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
}

export default UIBOT;