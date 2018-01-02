'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMessengerUi = require('react-messenger-ui');

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MessageView = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
    var recipient, text, reply;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            recipient = props.recipient, text = props.text;
            _context.t0 = text.replace(/[^\w\s]/gi, '').trim().toLowerCase();
            _context.next = _context.t0 === 'image' ? 4 : _context.t0 === 'gif' ? 5 : _context.t0 === 'audio' ? 6 : _context.t0 === 'video' ? 7 : _context.t0 === 'file' ? 8 : _context.t0 === 'quick reply' ? 9 : _context.t0 === 'button' ? 10 : _context.t0 === 'generic template' ? 11 : _context.t0 === 'generic' ? 11 : _context.t0 === 'list' ? 12 : _context.t0 === 'media' ? 13 : _context.t0 === 'receipt' ? 14 : _context.t0 === 'opengraph' ? 15 : 16;
            break;

          case 4:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(_reactMessengerUi.Attachment, { url: 'https://react-messenger-ui.herokuapp.com/img/logo.png' })
            ));

          case 5:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(_reactMessengerUi.Attachment, { url: 'https://media.giphy.com/media/3o7aCZEf0e3Bbo7Krm/source.gif' })
            ));

          case 6:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(_reactMessengerUi.Attachment, {
                type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.AUDIO,
                url: 'http://www.noiseaddicts.com/samples_1w72b820/2237.mp3'
              })
            ));

          case 7:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(_reactMessengerUi.Attachment, {
                type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.VIDEO,
                url: 'https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/allofus480.mov?raw=true'
              })
            ));

          case 8:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(_reactMessengerUi.Attachment, {
                type: _reactMessengerUi.CONSTANTS.ATTACHMENT_TYPE.FILE,
                url: 'https://raw.githubusercontent.com/fbsamples/messenger-platform-samples/master/node/public/assets/test.txt'
              })
            ));

          case 9:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 10:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 11:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 12:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 13:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 14:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 15:
            return _context.abrupt('return', _react2.default.createElement(
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
            ));

          case 16:
            _context.next = 18;
            return (0, _db.getRepliesByKey)(text);

          case 18:
            reply = _context.sent;

            console.log('found reply', reply);

            if (!reply) {
              _context.next = 30;
              break;
            }

            _context.prev = 21;
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(
                _reactMessengerUi.Text,
                null,
                reply.response
              )
            ));

          case 25:
            _context.prev = 25;
            _context.t1 = _context['catch'](21);
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(
                _reactMessengerUi.Text,
                null,
                text
              )
            ));

          case 28:
            _context.next = 31;
            break;

          case 30:
            return _context.abrupt('return', _react2.default.createElement(
              _reactMessengerUi.Message,
              { recipient: recipient },
              _react2.default.createElement(
                _reactMessengerUi.Text,
                null,
                text
              )
            ));

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[21, 25]]);
  }));

  return function MessageView(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = MessageView;