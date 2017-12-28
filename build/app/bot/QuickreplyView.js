'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickreplyView = function QuickreplyView(_ref) {
  var recipient = _ref.recipient,
      quick_reply = _ref.quick_reply,
      text = _ref.text,
      type = _ref.type;
  return _react2.default.createElement(
    _reactMessengerUi.Message,
    { recipient: recipient },
    _react2.default.createElement(
      _reactMessengerUi.Text,
      null,
      'You tab quick reply: ',
      text
    )
  );
};

exports.default = QuickreplyView;