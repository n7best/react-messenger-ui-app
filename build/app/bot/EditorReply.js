'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

var ReactMessengerUI = _interopRequireWildcard(_reactMessengerUi);

var _buble = require('buble');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorReply = function (_Component) {
  _inherits(EditorReply, _Component);

  function EditorReply() {
    _classCallCheck(this, EditorReply);

    return _possibleConstructorReturn(this, (EditorReply.__proto__ || Object.getPrototypeOf(EditorReply)).apply(this, arguments));
  }

  _createClass(EditorReply, [{
    key: 'render',
    value: function render() {

      try {
        var _props = this.props,
            recipient = _props.recipient,
            srcCode = _props.srcCode;


        var opts = {
          transforms: {
            dangerousForOf: true,
            dangerousTaggedTemplateString: true
          }
        };

        var transCode = (0, _buble.transform)(srcCode, opts).code;
        var finalCode = transCode.trim().replace(/^var \w+ =/, '').replace(/;$/, '');
        finalCode = 'return (' + finalCode + ')';
        //console.log('final code', finalCode)

        var scope = _extends({ React: _react2.default, Component: _react.Component }, ReactMessengerUI);

        var scopeKeys = Object.keys(scope);
        var scopeValues = scopeKeys.map(function (key) {
          return scope[key];
        });

        var evalFn = new (Function.prototype.bind.apply(Function, [null].concat(['React'], _toConsumableArray(scopeKeys), [finalCode])))();

        var ReplyComponent = evalFn.apply(undefined, [_react2.default].concat(_toConsumableArray(scopeValues)));

        return _react2.default.createElement(ReplyComponent, { recipient: recipient });
      } catch (e) {
        console.log('err', e);
        var _recipient = this.props.recipient;
        var Message = ReactMessengerUI.Message,
            Text = ReactMessengerUI.Text;


        return _react2.default.createElement(
          Message,
          { recipient: _recipient },
          _react2.default.createElement(
            Text,
            null,
            'Error Occured while compling your code!'
          )
        );
      }
    }
  }]);

  return EditorReply;
}(_react.Component);

exports.default = EditorReply;