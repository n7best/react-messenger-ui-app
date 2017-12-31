'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typing = function Typing(_ref) {
    var recipient = _ref.recipient,
        typing = _ref.typing;

    var action = typing ? _reactMessengerUi.CONSTANTS.SENDER_ACTIONS.TYPING_ON : _reactMessengerUi.CONSTANTS.SENDER_ACTIONS.TYPING_OFF;

    return _react2.default.createElement(_reactMessengerUi.SenderAction, { action: action, recipient: recipient });
};

exports.default = Typing;