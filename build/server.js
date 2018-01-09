'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _epilogue = require('epilogue');

var _epilogue2 = _interopRequireDefault(_epilogue);

var _humanReadableIds = require('human-readable-ids');

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _seed = require('./seed');

var _seed2 = _interopRequireDefault(_seed);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// credentiasl
var CREDENTIAL = {
  APP_SECRET: process.env.MESSENGER_APP_SECRET || _config2.default.get('appSecret'),
  VALIDATION_TOKEN: process.env.MESSENGER_VALIDATION_TOKEN || _config2.default.get('validationToken'),
  PAGE_ACCESS_TOKEN: process.env.MESSENGER_PAGE_ACCESS_TOKEN || _config2.default.get('pageAccessToken'),
  SERVER_URL: process.env.SERVER_URL || _config2.default.get('serverURL')
};
if (!(CREDENTIAL.APP_SECRET && CREDENTIAL.VALIDATION_TOKEN && CREDENTIAL.PAGE_ACCESS_TOKEN && CREDENTIAL.SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

// initialize bot
var bot = new _bot2.default((0, _express2.default)(), CREDENTIAL, {
  // defaults
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
  // Your react App
  app: _app2.default
});

// static documentation website
bot.server.use(_express2.default.static(_path2.default.join(__dirname, '../website/build/react-messenger-ui')));

// Create REST resource for custom codes
bot.on('initRoutes', function (server) {
  // resful routes
  _epilogue2.default.initialize({
    app: server,
    sequelize: _db.sequelize
  });

  var replyResource = _epilogue2.default.resource({
    model: _db.Reply,
    endpoints: ['/reply', '/reply/:id'],
    actions: ['create', 'update']
  });

  replyResource.create.write.before(function (req, res, context) {
    req.body.key = _humanReadableIds.hri.random().replace(/-/g, ' ');
    return context.continue;
  });
});

// seed db
bot.onSync('beforeStart', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _db.sequelize.sync({ force: true });

        case 2:
          console.log('test start');
          _context2.next = 5;
          return Promise.all(_seed2.default.map(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(reply) {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _db.Reply.create(reply);

                    case 2:
                      return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }()));

        case 5:
          console.log('finish seed');

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

// dynamic coding
bot.onSync('optinEvent', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
    var autoReply;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _db.getRepliesByKey)(event.optin.ref.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

          case 2:
            autoReply = _context3.sent;

            console.log('auto reply:', autoReply);
            if (autoReply) event.optin.autoReply = autoReply;

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}());

bot.onSync('message', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(message) {
    var autoReply;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _db.getRepliesByKey)(message.text.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

          case 2:
            autoReply = _context4.sent;

            console.log('auto reply:', autoReply);
            if (autoReply) message.autoReply = autoReply;

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}());

bot.start();