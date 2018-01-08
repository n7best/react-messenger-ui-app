'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promiseWaterfall = require('promise-waterfall');

var _promiseWaterfall2 = _interopRequireDefault(_promiseWaterfall);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BotEmitter = function (_EventEmitter) {
  _inherits(BotEmitter, _EventEmitter);

  function BotEmitter() {
    _classCallCheck(this, BotEmitter);

    var _this = _possibleConstructorReturn(this, (BotEmitter.__proto__ || Object.getPrototypeOf(BotEmitter)).apply(this, arguments));

    _this.emitSync = _this.emitSync.bind(_this);
    _this.onSync = _this.onSync.bind(_this);
    return _this;
  }

  _createClass(BotEmitter, [{
    key: 'emitSync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventName) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var listeners;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                listeners = this.listeners(eventName);

                if (!listeners.length) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return (0, _promiseWaterfall2.default)(listeners.map(function (listener) {
                  return function () {
                    return listener.apply(undefined, args);
                  };
                }));

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](2);
                throw new Error(_context.t0);

              case 10:
                return _context.abrupt('return', true);

              case 11:
                return _context.abrupt('return', false);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7]]);
      }));

      function emitSync(_x) {
        return _ref.apply(this, arguments);
      }

      return emitSync;
    }()
  }, {
    key: 'onSync',
    value: function onSync(eventName, listener) {
      var _this2 = this;

      return this.on(eventName, function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return listener.apply(undefined, args);

                case 2:
                  return _context2.abrupt('return', _context2.sent);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      });
    }
  }]);

  return BotEmitter;
}(_events2.default);

exports.default = BotEmitter;