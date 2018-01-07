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

var _epilogue = require('epilogue');

var _epilogue2 = _interopRequireDefault(_epilogue);

var _humanReadableIds = require('human-readable-ids');

var _verifyRequestSignature = require('./utils/verifyRequestSignature');

var _verifyRequestSignature2 = _interopRequireDefault(_verifyRequestSignature);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _codeReplies = require('./codeReplies');

var _codeReplies2 = _interopRequireDefault(_codeReplies);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIBOT = function () {
  function UIBOT(server, credentials, configs) {
    _classCallCheck(this, UIBOT);

    this.credentials = credentials;
    this.cfg = Object.assign({
      get_start_path: 'BOTPATH:/newuser',
      echo_path: '/echo',
      message_path: '/message',
      attachment_path: '/attachment',
      webhook_path: '/webhook',
      menu_path: '/menu',
      authsucess_path: '/authsuccess',
      typing_path: '/typing',
      sendApiUrl: 'https://graph.facebook.com/v2.6/me/messages',
      profileApiUrl: 'https://graph.facebook.com/v2.6/me/messenger_profile'
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
      this.server.get(this.cfg.webhook_path, this.webhookGetController.bind(this));
      // all message routes
      this.server.post(this.cfg.webhook_path, this.webhookPostController.bind(this));

      // resful routes
      _epilogue2.default.initialize({
        app: this.server,
        sequelize: _db.sequelize
      });

      // Create REST resource
      var replyResource = _epilogue2.default.resource({
        model: _db.Reply,
        endpoints: ['/reply', '/reply/:id'],
        actions: ['create', 'update']
      });

      replyResource.create.write.before(function (req, res, context) {
        req.body.key = _humanReadableIds.hri.random().replace(/-/g, ' ');
        return context.continue;
      });
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
      }, (0, _bot2.default)(this.cfg.menu_path)));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.server.set('port', process.env.PORT || 5000);

      _db.sequelize.sync({ force: true }).then(function () {
        //default data
        _codeReplies2.default.forEach(function (reply) {
          return _db.Reply.create(reply);
        });

        // start server
        _this.server.listen(_this.server.get('port'), function () {
          _this.log('Node server is running on port', _this.server.get('port'));
          _this.initMessenger();
        });
      });
    }
  }, {
    key: 'render',
    value: function render(path, props) {
      var direct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.log('Render:', path, props);
      // typing on
      this.send((0, _bot2.default)(this.cfg.typing_path, { recipient: props.recipient, typing: true }));
      var res = (0, _bot2.default)(path, props);
      (0, _bot2.default)(path, props);
      this.log('Render Reply:', JSON.stringify(res, undefined, 4));
      this.send(res);

      // typing off
      this.send((0, _bot2.default)(this.cfg.typing_path, { recipient: props.recipient, typing: false }));
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
          pageEntry.messaging.forEach(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(messagingEvent) {
              var senderID, recipientID, timeOfAuth, passThroughParam, autoReply, delivery, messageIDs, watermark, _watermark, sequenceNumber, _senderID, status, authCode, policy;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!messagingEvent.optin) {
                        _context.next = 18;
                        break;
                      }

                      // receivedAuthentication(messagingEvent);
                      senderID = messagingEvent.sender.id;
                      recipientID = messagingEvent.recipient.id;
                      timeOfAuth = messagingEvent.timestamp;
                      passThroughParam = messagingEvent.optin.ref;


                      _this2.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);

                      if (!passThroughParam) {
                        _context.next = 15;
                        break;
                      }

                      _context.next = 9;
                      return (0, _db.getRepliesByKey)(passThroughParam.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

                    case 9:
                      autoReply = _context.sent;

                      if (!autoReply) {
                        _context.next = 12;
                        break;
                      }

                      return _context.abrupt('return', _this2.render('/editorreply', { recipient: messagingEvent.sender, srcCode: autoReply.response }));

                    case 12:
                      _this2.render(_this2.cfg.message_path, { recipient: messagingEvent.sender, text: passThroughParam });
                      _context.next = 16;
                      break;

                    case 15:
                      _this2.render(_this2.cfg.authsucess_path, { recipient: messagingEvent.sender });

                    case 16:
                      _context.next = 19;
                      break;

                    case 18:
                      if (messagingEvent.message) {
                        _this2.messageHandler(messagingEvent);
                      } else if (messagingEvent.delivery) {
                        delivery = messagingEvent.delivery;
                        messageIDs = delivery.mids;
                        watermark = delivery.watermark;


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
                        _watermark = messagingEvent.read.watermark;
                        sequenceNumber = messagingEvent.read.seq;


                        _this2.log("Received message read event for watermark %d and sequence number %d", _watermark, sequenceNumber);
                      } else if (messagingEvent.account_linking) {
                        _senderID = messagingEvent.sender.id;
                        status = messagingEvent.account_linking.status;
                        authCode = messagingEvent.account_linking.authorization_code;


                        _this2.log("Received account link event with for user %d with status %s and auth code %s ", _senderID, status, authCode);
                      } else if (typeof messagingEvent['policy-enforcement'] !== 'undefined') {
                        policy = messagingEvent['policy-enforcement'];

                        _this2.log("Policy-Enforcement: ", policy.action, policy.reason);
                      } else {
                        _this2.log("Webhook received unknown messagingEvent: ", messagingEvent);
                      }

                    case 19:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this2);
            }));

            return function (_x2) {
              return _ref.apply(this, arguments);
            };
          }());
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
        this.render(this.cfg.message_path, { recipient: sender, text: payload });
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
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
        var message, autoReply;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.logMessage(event);
                message = event.message;

                // special cases

                if (!message.is_echo) {
                  _context2.next = 7;
                  break;
                }

                this.log("Received echo for message", message);
                return _context2.abrupt('return', this.render(this.cfg.echo_path, _extends({ recipient: event.sender }, message)));

              case 7:
                if (!message.quick_reply) {
                  _context2.next = 10;
                  break;
                }

                this.log("Quick reply for message %s with payload %s", message.mid, message.quick_reply);
                return _context2.abrupt('return', this.navigate(message.quick_reply.payload, event.sender));

              case 10:
                if (!message.text) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 13;
                return (0, _db.getRepliesByKey)(message.text.replace(/[^\w\s]/gi, '').trim().toLowerCase());

              case 13:
                autoReply = _context2.sent;

                if (!autoReply) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt('return', this.render('/editorreply', { recipient: event.sender, srcCode: autoReply.response }));

              case 16:
                return _context2.abrupt('return', this.render(this.cfg.message_path, { recipient: event.sender, text: message.text }));

              case 19:
                if (!message.attachments) {
                  _context2.next = 21;
                  break;
                }

                return _context2.abrupt('return', this.render(this.cfg.attachment_path, { recipient: event.sender, text: message.text }));

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function messageHandler(_x3) {
        return _ref2.apply(this, arguments);
      }

      return messageHandler;
    }()
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
        uri: this.cfg.sendApiUrl,
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