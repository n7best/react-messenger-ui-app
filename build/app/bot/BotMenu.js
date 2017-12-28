'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BotMenu = function BotMenu() {
  return _react2.default.createElement(
    _reactMessengerUi.PersistentMenu,
    null,
    _react2.default.createElement(
      _reactMessengerUi.Menu,
      null,
      _react2.default.createElement(
        _reactMessengerUi.PostbackButton,
        { payload: 'BOTPATH:/tryfeatures' },
        'Try Features'
      ),
      _react2.default.createElement(
        _reactMessengerUi.URLButton,
        { url: 'https://github.com/n7best/react-messenger-ui' },
        'Github'
      ),
      _react2.default.createElement(
        _reactMessengerUi.NestedMenu,
        { title: 'Nested Menu' },
        _react2.default.createElement(
          _reactMessengerUi.PostbackButton,
          { payload: 'BOTPATH:/tryfeatures' },
          'Try Features'
        ),
        _react2.default.createElement(
          _reactMessengerUi.URLButton,
          { url: 'https://github.com/n7best/react-messenger-ui' },
          'Github'
        )
      )
    )
  );
};

exports.default = BotMenu;