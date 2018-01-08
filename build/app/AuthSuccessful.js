'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

var _EditorReply = require('./EditorReply');

var _EditorReply2 = _interopRequireDefault(_EditorReply);

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthSuccessful = function (_React$Component) {
  _inherits(AuthSuccessful, _React$Component);

  function AuthSuccessful(props) {
    _classCallCheck(this, AuthSuccessful);

    var _this = _possibleConstructorReturn(this, (AuthSuccessful.__proto__ || Object.getPrototypeOf(AuthSuccessful)).call(this, props));

    _this.state = {
      isAutoReply: false,
      code: false
    };
    return _this;
  }

  _createClass(AuthSuccessful, [{
    key: 'componentWillMount',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var ref, autoReply;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref = this.props.ref;

                if (!ref) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return (0, _db.getRepliesByKey)(ref.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

              case 4:
                autoReply = _context.sent;

                console.log('found ', autoReply);
                if (autoReply) {
                  this.setState({
                    code: autoReply.response
                  });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var recipient = this.props.recipient;
      var _state = this.state,
          isAutoReply = _state.isAutoReply,
          code = _state.code;


      console.log('render auth');

      if (isAutoReply) {
        return _react2.default.createElement(_EditorReply2.default, { recipient: recipient, srcCode: code });
      }

      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.Text,
          null,
          'Authentication successful'
        )
      );
    }
  }]);

  return AuthSuccessful;
}(_react2.default.Component);

exports.default = AuthSuccessful;