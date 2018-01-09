"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyRequestSignature = function verifyRequestSignature(app) {
  return function (req, res, buf) {
    if (req.path !== app.cfg.webhook_path) return;
    var signature = req.headers["x-hub-signature"];

    if (!signature) {
      // For testing, let's log an error. In production, you should throw an
      // error.
      app.error("Couldn't validate the signature.");
    } else {
      var elements = signature.split('=');
      var method = elements[0];
      var signatureHash = elements[1];

      var expectedHash = _crypto2.default.createHmac('sha1', app.credentials.APP_SECRET).update(buf).digest('hex');

      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  };
};

exports.default = verifyRequestSignature;