import crypto from 'crypto';

const verifyRequestSignature = (app) =>
  (req, res, buf) => {
    if ( req.path !== app.cfg.webhook_path) return;
    const signature = req.headers["x-hub-signature"];

    if (!signature) {
      // For testing, let's log an error. In production, you should throw an
      // error.
      app.error("Couldn't validate the signature.");
    } else {
    const elements = signature.split('=');
    const method = elements[0];
    const signatureHash = elements[1];

    const expectedHash = crypto.createHmac('sha1', app.credentials.APP_SECRET).update(buf).digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

export default verifyRequestSignature;