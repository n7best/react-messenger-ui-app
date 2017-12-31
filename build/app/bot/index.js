'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactMessengerUi = require('react-messenger-ui');

var _MessageView = require('./MessageView');

var _MessageView2 = _interopRequireDefault(_MessageView);

var _ = require('./404');

var _2 = _interopRequireDefault(_);

var _QuickreplyView = require('./QuickreplyView');

var _QuickreplyView2 = _interopRequireDefault(_QuickreplyView);

var _TryFeaturesView = require('./TryFeaturesView');

var _TryFeaturesView2 = _interopRequireDefault(_TryFeaturesView);

var _BotMenu = require('./BotMenu');

var _BotMenu2 = _interopRequireDefault(_BotMenu);

var _AuthSuccessful = require('./AuthSuccessful');

var _AuthSuccessful2 = _interopRequireDefault(_AuthSuccessful);

var _NewuserView = require('./NewuserView');

var _NewuserView2 = _interopRequireDefault(_NewuserView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// routes


exports.default = function (path, props) {

  // auto pass props to all route since it's static rendering
  var PropRoute = function PropRoute(_ref) {
    var Component = _ref.component,
        others = _objectWithoutProperties(_ref, ['component']);

    return _react2.default.createElement(_reactRouter.Route, _extends({}, others, { render: function render(componentProps) {
        return _react2.default.createElement(Component, _extends({}, componentProps, props));
      } }));
  };

  return (0, _reactMessengerUi.render)(_react2.default.createElement(
    _reactRouter.StaticRouter,
    { location: { pathname: path } },
    _react2.default.createElement(
      _reactRouter.Switch,
      null,
      _react2.default.createElement(PropRoute, { path: '/message', component: _MessageView2.default }),
      _react2.default.createElement(PropRoute, { path: '/quickreply', component: _QuickreplyView2.default }),
      _react2.default.createElement(PropRoute, { path: '/tryfeatures', component: _TryFeaturesView2.default }),
      _react2.default.createElement(PropRoute, { path: '/menu', component: _BotMenu2.default }),
      _react2.default.createElement(PropRoute, { path: '/authsuccess', component: _AuthSuccessful2.default }),
      _react2.default.createElement(PropRoute, { path: '/newuser', component: _NewuserView2.default }),
      _react2.default.createElement(PropRoute, { component: _2.default })
    )
  ));
};