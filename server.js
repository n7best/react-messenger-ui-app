import path from 'path';
import config from 'config';
import express from 'express';
import UIBOT from './app';

// credentiasl
const CREDENTIAL = {
  APP_SECRET: process.env.MESSENGER_APP_SECRET || config.get('appSecret'),
  VALIDATION_TOKEN: process.env.MESSENGER_VALIDATION_TOKEN || config.get('validationToken'),
  PAGE_ACCESS_TOKEN: process.env.MESSENGER_PAGE_ACCESS_TOKEN || config.get('pageAccessToken'),
  SERVER_URL: process.env.SERVER_URL || config.get('serverURL')
};
if (!(CREDENTIAL.APP_SECRET && CREDENTIAL.VALIDATION_TOKEN && CREDENTIAL.PAGE_ACCESS_TOKEN && CREDENTIAL.SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

// app
const bot = new UIBOT(express(), CREDENTIAL);

// static docs
bot.server.use(express.static(path.join(__dirname, '../website/build/react-messenger-ui')));

bot.start();