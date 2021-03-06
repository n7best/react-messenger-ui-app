'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewuserView = function NewuserView(_ref) {
   var recipient = _ref.recipient;
   return _react2.default.createElement(
      _reactMessengerUi.Message,
      { recipient: recipient },
      _react2.default.createElement(
         _reactMessengerUi.Text,
         null,
         'Welcome! Use the menu or try command like image, gif, button, generic, media, receipt or opengraph'
      )
   );
};

exports.default = NewuserView;