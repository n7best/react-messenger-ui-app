'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _verifyRequestSignature = require('./utils/verifyRequestSignature');

var _verifyRequestSignature2 = _interopRequireDefault(_verifyRequestSignature);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIBOT = function () {
  function UIBOT(server, credentials, configs) {
    _classCallCheck(this, UIBOT);

    this.credentials = credentials;
    this.cfg = Object.assign({
      get_start_path: 'BOTPATH:/newuser'
    }, configs);
    this.server = server;
    this.server.use(_bodyParser2.default.json({
      verify: (0, _verifyRequestSignature2.default)(this)
    }));
    this.initRoutes();
  }

  _createClass(UIBOT, [{
    key: 'initRoutes',
    value: function initRoutes() {
      // token verification
      this.server.get('/webhook', this.webhookGetController.bind(this));
      // all message routes
      this.server.post('/webhook', this.webhookPostController.bind(this));
    }
  }, {
    key: 'initMessenger',
    value: function initMessenger() {
      // send menu
      this.log('Setting menu for the bot');
      this.profile(Object.assign({
        get_started: {
          payload: this.cfg.get_start_path
        }
      }, (0, _bot2.default)('/menu')));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.server.set('port', process.env.PORT || 5000);
      this.server.listen(this.server.get('port'), function () {
        _this.log('Node server is running on port', _this.server.get('port'));
        _this.initMessenger();
      });
    }
  }, {
    key: 'render',
    value: function render(path, props) {
      this.log('Render:', path, props);
      // typing on
      this.send((0, _bot2.default)('/typing', { recipient: props.recipient, typing: true }));
      var res = (0, _bot2.default)(path, props);
      (0, _bot2.default)(path, props);
      this.log('||| render:', res);
      this.send(res);

      // typing off
      this.send((0, _bot2.default)('/typing', { recipient: props.recipient, typing: false }));
    }
  }, {
    key: 'webhookGetController',
    value: function webhookGetController(req, res) {
      if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === this.credentials.VALIDATION_TOKEN) {
        this.log("Validated webhook");
        res.status(200).send(req.query['hub.challenge']);
      } else {
        this.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
      }
    }
  }, {
    key: 'webhookPostController',
    value: function webhookPostController(req, res) {
      var _this2 = this;

      var data = req.body;

      // Make sure this is a page subscription
      if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function (pageEntry) {
          // Iterate over each messaging event
          pageEntry.messaging.forEach(function (messagingEvent) {
            if (messagingEvent.optin) {
              // receivedAuthentication(messagingEvent);
              var senderID = messagingEvent.sender.id;
              var recipientID = messagingEvent.recipient.id;
              var timeOfAuth = messagingEvent.timestamp;
              var passThroughParam = messagingEvent.optin.ref;

              _this2.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);
              if (passThroughParam) {
                _this2.render('/message', { recipient: messagingEvent.sender, text: passThroughParam });
              } else {
                _this2.render('/authsuccess', { recipient: messagingEvent.sender });
              }
            } else if (messagingEvent.message) {
              _this2.messageHandler(messagingEvent);
            } else if (messagingEvent.delivery) {
              var delivery = messagingEvent.delivery;
              var messageIDs = delivery.mids;
              var watermark = delivery.watermark;

              if (messageIDs) {
                messageIDs.forEach(function (messageID) {
                  return _this2.log("Received delivery confirmation for message ID: %s", messageID);
                });
              }

              _this2.log("All message before %d were delivered.", watermark);
            } else if (messagingEvent.postback) {
              _this2.postbackHandler(messagingEvent);
            } else if (messagingEvent.read) {
              // All messages before watermark (a timestamp) or sequence have been seen.
              var _watermark = messagingEvent.read.watermark;
              var sequenceNumber = messagingEvent.read.seq;

              _this2.log("Received message read event for watermark %d and sequence number %d", _watermark, sequenceNumber);
            } else if (messagingEvent.account_linking) {
              var _senderID = messagingEvent.sender.id;
              var status = messagingEvent.account_linking.status;
              var authCode = messagingEvent.account_linking.authorization_code;

              _this2.log("Received account link event with for user %d with status %s and auth code %s ", _senderID, status, authCode);
            } else if (typeof messagingEvent['policy-enforcement'] !== 'undefined') {
              var policy = messagingEvent['policy-enforcement'];
              _this2.log("Policy-Enforcement: ", policy.action, policy.reason);
            } else {
              _this2.log("Webhook received unknown messagingEvent: ", messagingEvent);
            }
          });
        });

        // must sent 200 to recongnize received
        res.sendStatus(200);
      }
    }
  }, {
    key: 'navigate',
    value: function navigate(payload, sender) {
      //check if it's bot path
      if (payload.substring(0, 8) == "BOTPATH:") {
        var botpath = payload.substring(8);
        this.render(botpath, { recipient: sender });
      } else {
        this.render('/message', { recipient: sender, text: payload });
      }
    }
  }, {
    key: 'postbackHandler',
    value: function postbackHandler(event) {
      this.logPostback(event);
      this.navigate(event.postback.payload, event.sender);
    }
  }, {
    key: 'messageHandler',
    value: function messageHandler(event) {
      this.logMessage(event);
      var message = event.message;

      // special cases
      if (message.is_echo) {
        this.log("Received echo for message", message);
        return this.render('/echo', _extends({ recipient: event.sender }, message));
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
  }, {
    key: 'logMessage',
    value: function logMessage(event) {
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var message = event.message;

      this.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage, JSON.stringify(message));
    }
  }, {
    key: 'logPostback',
    value: function logPostback(event) {
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var payload = event.postback.payload;

      this.log("Received postback for user %d and page %d at %d with postback:", senderID, recipientID, timeOfMessage, JSON.stringify(payload));
    }
  }, {
    key: 'log',
    value: function log() {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }
  }, {
    key: 'error',
    value: function error() {
      var _console2;

      (_console2 = console).error.apply(_console2, arguments);
    }
  }, {
    key: 'send',
    value: function send(data) {
      var _this3 = this;

      var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      (0, _request2.default)({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: data
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if (body.message_id) {
            _this3.log("Successfully sent message with id %s to recipient %s", body.message_id, body.recipient_id);
          } else {
            _this3.log("Successfully called Send API for recipient %s", body.recipient_id);
          }
        } else {
          _this3.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
      });
    }
  }, {
    key: 'profile',
    value: function profile(data) {
      var _this4 = this;

      (0, _request2.default)({
        uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: data
      }, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.result === 'success') {
          _this4.log("Successfully update profile with", data);
        } else {
          _this4.error("Failed calling Profile API", response.statusCode, response.statusMessage, body.error);
        }
      });
    }
  }]);

  return UIBOT;
}();

exports.default = UIBOT;