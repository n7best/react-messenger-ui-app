'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

var _EditorReply = require('./EditorReply');

var _EditorReply2 = _interopRequireDefault(_EditorReply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AuthSuccessful = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
    var _props, recipient, autoReply;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _props = undefined.props, recipient = _props.recipient, autoReply = _props.autoReply;


            console.log('auth success', undefined.props);

            if (!autoReply) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', _react2.default.createElement(_EditorReply2.default, { recipient: recipient, srcCode: autoReply.response }));

          case 4:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(
                _reactMessengerUi.Text,
                null,
                'Authentication successful'
              )
            ));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function AuthSuccessful(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.default = AuthSuccessful;