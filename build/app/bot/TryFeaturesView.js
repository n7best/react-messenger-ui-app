'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var TryFeaturesView = function TryFeaturesView(props) {
  var recipient = props.recipient;

  var features = ['image', 'gif', 'audio', 'video', 'file', 'button', 'generic template', 'list', 'media', 'receipt', 'opengraph'];

  return _react2.default.createElement(
    _reactMessengerUi.Message,
    { recipient: recipient },
    _react2.default.createElement(
      _reactMessengerUi.Text,
      null,
      'Try some awesome features?'
    ),
    features.map(function (feature) {
      return _react2.default.createElement(_reactMessengerUi.QuickReply, { key: feature, title: capitalize_Words(feature), payload: feature });
    })
  );
};

exports.default = TryFeaturesView;