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

var MessageView = function MessageView(_ref) {
  var recipient = _ref.recipient,
      text = _ref.text,
      autoReply = _ref.autoReply;


  switch (text.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {
    case 'image':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(_reactMessengerUi.Attachment, { url: 'https://react-messenger-ui.herokuapp.com/img/logo.png' })
      );

    case 'gif':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(_reactMessengerUi.Attachment, { url: 'https://media.giphy.com/media/3o7aCZEf0e3Bbo7Krm/source.gif' })
      );

    case 'audio':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(_reactMessengerUi.Attachment, {
          type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.AUDIO,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/2237.mp3'
        })
      );

    case 'video':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(_reactMessengerUi.Attachment, {
          type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.VIDEO,
          url: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/allofus480.mov?raw=true'
        })
      );

    case 'file':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(_reactMessengerUi.Attachment, {
          type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.FILE,
          url: 'https://raw.githubusercontent.com/fbsamples/messenger-platform-samples/master/node/public/assets/test.txt'
        })
      );

    case 'quick reply':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.Text,
          null,
          'What\'s your favorite movie genre?'
        ),
        _react2.default.createElement(_reactMessengerUi.QuickReply, { title: 'Search', payload: '<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION>' }),
        _react2.default.createElement(_reactMessengerUi.QuickReply, { title: 'Comedy', payload: '<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY>' }),
        _react2.default.createElement(_reactMessengerUi.QuickReply, { title: 'Drama', payload: '<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA>' })
      );

    case 'button':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.ButtonTemplate,
          null,
          'This is test text',
          _react2.default.createElement(
            _reactMessengerUi.URLButton,
            { url: 'https://www.oculus.com/en-us/rift/' },
            'Open Web URL'
          ),
          _react2.default.createElement(
            _reactMessengerUi.PostbackButton,
            { payload: 'DEVELOPER_DEFINED_PAYLOAD' },
            'Trigger Postback'
          ),
          _react2.default.createElement(
            _reactMessengerUi.CallButton,
            { payload: '+16505551234' },
            'Call Phone Number'
          )
        )
      );

    case 'generic template':
    case 'generic':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.GenericTemplate,
          null,
          _react2.default.createElement(
            _reactMessengerUi.GenericElement,
            {
              title: 'rift',
              subtitle: 'next-generation virtual reality',
              imageUrl: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true'
            },
            _react2.default.createElement(
              _reactMessengerUi.URLButton,
              { url: 'https://www.oculus.com/en-us/rift/' },
              'Open Web URL'
            ),
            _react2.default.createElement(
              _reactMessengerUi.PostbackButton,
              { payload: 'magic payload' },
              'Call Postback'
            )
          ),
          _react2.default.createElement(
            _reactMessengerUi.GenericElement,
            {
              title: 'touch',
              subtitle: 'Your Hands, Now in VR',
              imageUrl: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/touch.png?raw=true'
            },
            _react2.default.createElement(
              _reactMessengerUi.URLButton,
              { url: 'https://www.oculus.com/en-us/touch/' },
              'Open Web URL'
            ),
            _react2.default.createElement(
              _reactMessengerUi.PostbackButton,
              { payload: 'magic payload' },
              'Call Postback'
            )
          )
        )
      );

    case 'list':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.ListTemplate,
          null,
          _react2.default.createElement(
            _reactMessengerUi.ListElement,
            {
              title: 'rift',
              subtitle: 'next-generation virtual reality',
              imageUrl: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true'
            },
            _react2.default.createElement(
              _reactMessengerUi.URLButton,
              { url: 'https://www.oculus.com/en-us/rift/' },
              'Open Web URL'
            )
          ),
          _react2.default.createElement(
            _reactMessengerUi.ListElement,
            {
              title: 'touch',
              subtitle: 'Your Hands, Now in VR',
              imageUrl: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/touch.png?raw=true'
            },
            _react2.default.createElement(
              _reactMessengerUi.URLButton,
              { url: 'https://www.oculus.com/en-us/touch/' },
              'Open Web URL'
            )
          ),
          _react2.default.createElement(
            _reactMessengerUi.URLButton,
            { url: 'https://www.oculus.com/en-us/touch/' },
            'Open Web URL'
          )
        )
      );

    case 'media':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.MediaTemplate,
          null,
          _react2.default.createElement(_reactMessengerUi.MediaElement, {
            type: _reactMessengerUi.CONSTANTS.MEDIA_TYPE.IMAGE,
            url: 'https://www.facebook.com/552483055096851/photos/a.552483101763513.1073741825.552483055096851/552484795096677/?type=3&theater'
          })
        )
      );

    case 'receipt':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.ReceiptTemplate,
          {
            recipientName: 'Charlie',
            orderNumber: '12345678902',
            paymentMethod: 'Visa 1234',
            timestamp: '1428444852'
          },
          _react2.default.createElement(_reactMessengerUi.Address, {
            street1: '1 Hacker Way',
            city: 'Menlo Park',
            postalCode: '94025',
            state: 'CA',
            country: 'USA'
          }),
          _react2.default.createElement(_reactMessengerUi.Summary, {
            subtotal: 75.00,
            shippingCost: 4.95,
            totalTax: 6.19,
            totalCost: 56.14
          }),
          _react2.default.createElement(_reactMessengerUi.Adjustment, { name: 'New Customer Discount', amount: 20 }),
          _react2.default.createElement(_reactMessengerUi.Adjustment, { name: '$10 Off Coupon', amount: 10 }),
          _react2.default.createElement(_reactMessengerUi.ReceiptElement, {
            title: 'Classic White T-shirt',
            subTitle: '100% Soft and Luxurious Cotton',
            quantity: 2,
            price: 50,
            currency: 'USD',
            imageUrl: 'http://petersapparel.parseapp.com/img/whiteshirt.png'
          }),
          _react2.default.createElement(_reactMessengerUi.ReceiptElement, {
            title: 'Classic Gray T-shirt',
            subTitle: '100% Soft and Luxurious Cotton',
            quantity: 1,
            price: 25,
            currency: 'USD',
            imageUrl: 'http://petersapparel.parseapp.com/img/grayshirt.png'
          })
        )
      );

    case 'opengraph':
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.OpenGraphTemplate,
          null,
          _react2.default.createElement(
            _reactMessengerUi.OpenGraphElement,
            { url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb' },
            _react2.default.createElement(
              _reactMessengerUi.URLButton,
              { url: 'https://en.wikipedia.org/wiki/Rickrolling' },
              'View More'
            )
          )
        )
      );

    default:
      if (autoReply) {
        return _react2.default.createElement(_EditorReply2.default, { recipient: recipient, srcCode: autoReply.response });
      }
      return _react2.default.createElement(
        _reactMessengerUi.Message,
        { recipient: recipient },
        _react2.default.createElement(
          _reactMessengerUi.Text,
          null,
          text
        )
      );
  }
};

exports.default = MessageView;