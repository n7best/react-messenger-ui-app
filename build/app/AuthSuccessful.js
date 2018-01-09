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

var AuthSuccessful = function AuthSuccessful(props) {
  var recipient = props.recipient,
      autoReply = props.autoReply;

  console.log('auth success', recipient, props);

  if (autoReply) {
    return _react2.default.createElement(_EditorReply2.default, { recipient: recipient, srcCode: autoReply.response });
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
};
exports.default = AuthSuccessful;