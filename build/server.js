'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// credentiasl
var CREDENTIAL = {
  APP_SECRET: process.env.MESSENGER_APP_SECRET || _config2.default.get('appSecret'),
  VALIDATION_TOKEN: process.env.MESSENGER_VALIDATION_TOKEN || _config2.default.get('validationToken'),
  PAGE_ACCESS_TOKEN: process.env.MESSENGER_PAGE_ACCESS_TOKEN || _config2.default.get('pageAccessToken'),
  SERVER_URL: process.env.SERVER_URL || _config2.default.get('serverURL')
};
if (!(CREDENTIAL.APP_SECRET && CREDENTIAL.VALIDATION_TOKEN && CREDENTIAL.PAGE_ACCESS_TOKEN && CREDENTIAL.SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

// app
var bot = new _app2.default((0, _express2.default)(), CREDENTIAL);

// static docs
bot.server.use(_express2.default.static(_path2.default.join(__dirname, '../website/build/react-messenger-ui')));

bot.start();