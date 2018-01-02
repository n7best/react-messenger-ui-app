'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _lowdb = require('lowdb');

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = require('lowdb/adapters/FileSync');

var _FileSync2 = _interopRequireDefault(_FileSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// database
var adapter = new _FileSync2.default('db.json');
var db = exports.db = (0, _lowdb2.default)(adapter);

// Set some defaults
db.defaults({ replies: [] }).write();