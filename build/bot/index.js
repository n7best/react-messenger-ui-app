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

var _botEmitter = require('./utils/botEmitter');

var _botEmitter2 = _interopRequireDefault(_botEmitter);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIBOT = function (_BotEmitter) {
  _inherits(UIBOT, _BotEmitter);

  function UIBOT(server, credentials, configs) {
    _classCallCheck(this, UIBOT);

    var _this = _possibleConstructorReturn(this, (UIBOT.__proto__ || Object.getPrototypeOf(UIBOT)).call(this));

    _this.credentials = credentials;
    _this.cfg = Object.assign({
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
    _this.server = server;
    _this.server.use(_bodyParser2.default.json({
      verify: (0, _verifyRequestSignature2.default)(_this)
    }));

    // debug
    if (_this.cfg.debug) {
      _this.initDebug();
    }

    _this.initRoutes();
    return _this;
  }

  _createClass(UIBOT, [{
    key: 'initDebug',
    value: function initDebug() {
      var _this2 = this;

      this.on('beforeRender', function (path, props) {
        return _this2.log('Render:', path, props);
      });
      this.on('afterRender', function (json) {
        return _this2.log('Render Reply:', JSON.stringify(json, undefined, 4));
      });
      this.on('afterStart', function (port) {
        return _this2.log('Node server is running on port', port);
      });
      this.on('sendSuccess', function (response, body) {
        if (body.message_id) {
          _this2.log("Successfully sent message with id %s to recipient %s", body.message_id, body.recipient_id);
        } else {
          _this2.log("Successfully called Send API for recipient %s", body.recipient_id);
        }
      });
      this.on('sendError', function (response, body) {
        return _this2.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
      });
    }
  }, {
    key: 'initRoutes',
    value: function initRoutes() {
      if (!this.cfg.app) throw new Error('not app is provided');

      // token verification
      this.server.get(this.cfg.webhook_path, this.webhookGetController.bind(this));
      // all message routes
      this.server.post(this.cfg.webhook_path, this.webhookPostController.bind(this));

      this.emit('initRoutes');
    }
  }, {
    key: 'initMessenger',
    value: function initMessenger() {
      // send menu
      this.log('Setting menu for the bot');
      this.profile(Object.assign({
        get_started: {
          payload: this.cfg.path_prefix + this.cfg.get_start_path
        }
      }, this.cfg.profileConfig, this.cfg.app(this.cfg.menu_path)));
    }
  }, {
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.server.set('port', process.env.PORT || 5000);
                _context.next = 3;
                return this.emitSync('beforeStart');

              case 3:
                // start server
                this.server.listen(this.server.get('port'), function () {
                  _this3.initMessenger();

                  _this3.emit('afterStart', _this3.server.get('port'));
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'render',
    value: function render(path, props) {
      // typing on
      if (this.cfg.sendTypingOnRender) {
        this.send(this.cfg.app(this.cfg.typing_path, { recipient: props.recipient, typing: true }));
      }

      this.emit('beforeRender', path, props);
      var res = this.cfg.app(path, props);
      this.emit('afterRender', res);

      this.send(res);

      // typing off
      if (this.cfg.sendTypingOnRender) {
        this.send(this.cfg.app(this.cfg.typing_path, { recipient: props.recipient, typing: false }));
      }
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
      var _this4 = this;

      var data = req.body;

      // Make sure this is a page subscription
      if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function (pageEntry) {
          // Iterate over each messaging event
          pageEntry.messaging.forEach(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(messagingEvent) {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (messagingEvent.optin) {
                        // receivedAuthentication(messagingEvent);
                        _this4.optinHandler(messagingEvent);
                      } else if (messagingEvent.message) {
                        _this4.messageHandler(messagingEvent);
                      } else if (messagingEvent.delivery) {
                        _this4.deliveryHanlder(messagingEvent);
                      } else if (messagingEvent.postback) {
                        _this4.postbackHandler(messagingEvent);
                      } else if (messagingEvent.read) {
                        _this4.readHandler(messagingEvent);
                      } else if (messagingEvent.account_linking) {
                        _this4.accountLinkingHanlder(messagingEvent);
                      } else if (typeof messagingEvent['policy-enforcement'] !== 'undefined') {
                        _this4.policyHandler(messagingEvent);
                      } else {
                        _this4.log("Webhook received unknown messagingEvent: ", messagingEvent);
                      }

                    case 1:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this4);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
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
      if (payload.substring(0, 8) == this.cfg.path_prefix) {
        var botpath = payload.substring(8);
        this.render(botpath, { recipient: sender });
      } else {
        this.render(this.cfg.message_path, { recipient: sender, text: payload });
      }
    }
  }, {
    key: 'policyHandler',
    value: function policyHandler(event) {
      var policy = event['policy-enforcement'];
      this.log("Policy-Enforcement: ", policy.action, policy.reason);
    }
  }, {
    key: 'accountLinkingHanlder',
    value: function accountLinkingHanlder(event) {
      var senderID = event.sender.id;
      var status = event.account_linking.status;
      var authCode = event.account_linking.authorization_code;

      this.log("Received account link event with for user %d with status %s and auth code %s ", senderID, status, authCode);
    }
  }, {
    key: 'postbackHandler',
    value: function postbackHandler(event) {
      this.logPostback(event);
      this.navigate(event.postback.payload, event.sender);
    }
  }, {
    key: 'deliveryHanlder',
    value: function deliveryHanlder(event) {
      var _this5 = this;

      var delivery = event.delivery;
      var messageIDs = delivery.mids;
      var watermark = delivery.watermark;

      if (messageIDs) {
        messageIDs.forEach(function (messageID) {
          return _this5.log("Received delivery confirmation for message ID: %s", messageID);
        });
      }

      this.log("All message before %d were delivered.", watermark);
    }
  }, {
    key: 'readHandler',
    value: function readHandler(event) {
      var watermark = event.read.watermark;
      var sequenceNumber = event.read.seq;

      this.log("Received message read event for watermark %d and sequence number %d", watermark, sequenceNumber);
    }
  }, {
    key: 'optinHandler',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
        var senderID, recipientID, timeOfAuth, passThroughParam, autoReply;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                senderID = event.sender.id;
                recipientID = event.recipient.id;
                timeOfAuth = event.timestamp;
                passThroughParam = event.optin.ref;


                this.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);

                if (!passThroughParam) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 8;
                return (0, _db.getRepliesByKey)(passThroughParam.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

              case 8:
                autoReply = _context3.sent;

                if (!autoReply) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt('return', this.render('/editorreply', { recipient: event.sender, srcCode: autoReply.response }));

              case 11:
                this.render(this.cfg.message_path, { recipient: event.sender, text: passThroughParam });
                _context3.next = 15;
                break;

              case 14:
                this.render(this.cfg.authsucess_path, { recipient: event.sender });

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function optinHandler(_x2) {
        return _ref3.apply(this, arguments);
      }

      return optinHandler;
    }()
  }, {
    key: 'messageHandler',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
        var message, autoReply;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.logMessage(event);
                message = event.message;

                // special cases

                if (!message.is_echo) {
                  _context4.next = 7;
                  break;
                }

                this.log("Received echo for message", message);
                return _context4.abrupt('return', this.render(this.cfg.echo_path, _extends({ recipient: event.sender }, message)));

              case 7:
                if (!message.quick_reply) {
                  _context4.next = 10;
                  break;
                }

                this.log("Quick reply for message %s with payload %s", message.mid, message.quick_reply);
                return _context4.abrupt('return', this.navigate(message.quick_reply.payload, event.sender));

              case 10:
                if (!message.text) {
                  _context4.next = 19;
                  break;
                }

                _context4.next = 13;
                return (0, _db.getRepliesByKey)(message.text.replace(/[^\w\s]/gi, '').trim().toLowerCase());

              case 13:
                autoReply = _context4.sent;

                if (!autoReply) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt('return', this.render('/editorreply', { recipient: event.sender, srcCode: autoReply.response }));

              case 16:
                return _context4.abrupt('return', this.render(this.cfg.message_path, { recipient: event.sender, text: message.text }));

              case 19:
                if (!message.attachments) {
                  _context4.next = 21;
                  break;
                }

                return _context4.abrupt('return', this.render(this.cfg.attachment_path, { recipient: event.sender, text: message.text }));

              case 21:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function messageHandler(_x3) {
        return _ref4.apply(this, arguments);
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
      var _this6 = this;

      var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.emit('beforeSend', data, form);
      (0, _request2.default)({
        uri: this.cfg.sendApiUrl,
        qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: data
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          _this6.emit('sendSuccess', response, body);
        } else {
          _this6.emit('sendError', response, body);
        }
      });
    }
  }, {
    key: 'profile',
    value: function profile(data) {
      var _this7 = this;

      (0, _request2.default)({
        uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: { access_token: this.credentials.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: data
      }, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.result === 'success') {
          _this7.log("Successfully update profile with", data);
        } else {
          _this7.error("Failed calling Profile API", response.statusCode, response.statusMessage, body.error);
        }
      });
    }
  }]);

  return UIBOT;
}(_botEmitter2.default);

exports.default = UIBOT;