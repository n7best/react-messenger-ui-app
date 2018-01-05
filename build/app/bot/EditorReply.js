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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vm = require('vm');

var EditorReply = function (_Component) {
  _inherits(EditorReply, _Component);

  function EditorReply(props) {
    _classCallCheck(this, EditorReply);

    var _this = _possibleConstructorReturn(this, (EditorReply.__proto__ || Object.getPrototypeOf(EditorReply)).call(this, props));

    _this.state = { hasError: false };
    return _this;
  }

  _createClass(EditorReply, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      console.log('error', error, info);
      this.setState({
        hasError: error
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.hasError) {
        console.log('err', this.state.hasError.message);
        var recipient = this.props.recipient;
        var Message = ReactMessengerUI.Message,
            Text = ReactMessengerUI.Text;


        return _react2.default.createElement(
          Message,
          { recipient: recipient },
          _react2.default.createElement(
            Text,
            null,
            'Error! ' + this.state.hasError.message
          )
        );
      }
      try {
        var sandbox = _extends({ result: null, React: _react2.default, Component: _react.Component }, ReactMessengerUI);
        var _props = this.props,
            _recipient = _props.recipient,
            srcCode = _props.srcCode;

        var opts = {
          transforms: {
            dangerousForOf: true,
            dangerousTaggedTemplateString: true,
            modules: false
          }

          // create vm to isolate code excution
        };vm.createContext(sandbox);

        var transCode = (0, _buble.transform)(srcCode, opts).code;
        var finalCode = transCode.trim().replace(/^var \w+ =/, '').replace(/;$/, '');
        finalCode = 'result = (' + finalCode + ')';
        // console.log('final code', finalCode)

        try {
          vm.runInContext(finalCode, sandbox, { displayErrors: true });
        } catch (e) {
          throw e;
        }

        // console.log('final result: ',sandbox.result);
        // const ReplyComponent = evalFn(React, ...scopeValues)
        var ReplyComponent = sandbox.result;
        return _react2.default.createElement(ReplyComponent, { recipient: _recipient });
      } catch (e) {
        console.log('err', e.message);
        var _recipient2 = this.props.recipient;
        var _Message = ReactMessengerUI.Message,
            _Text = ReactMessengerUI.Text;


        return _react2.default.createElement(
          _Message,
          { recipient: _recipient2 },
          _react2.default.createElement(
            _Text,
            null,
            'Error! ' + e.message
          )
        );
      }
    }
  }]);

  return EditorReply;
}(_react.Component);

exports.default = EditorReply;