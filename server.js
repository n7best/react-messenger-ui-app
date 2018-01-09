import path from 'path';
import config from 'config';
import express from 'express';
import epilogue from 'epilogue';
import { hri } from 'human-readable-ids';
import UIBOT from './bot';
import App from './app';
import seed from './seed';
import {getRepliesByKey, sequelize, Reply } from './db';

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

// initialize bot
const bot = new UIBOT(express(), CREDENTIAL, {
  // defaults
  path_prefix: 'BOTPATH:',
  get_start_path: '/newuser',
  echo_path: '/echo',
  message_path: '/message',
  attachment_path: '/attachment',
  webhook_path: '/webhook',
  menu_path: '/menu',
  authsucess_path: '/authsuccess',
  typing_path: '/typing',
  sendApiUrl: 'https://graph.facebook.com/v2.6/me/messages',
  profileApiUrl: 'https://graph.facebook.com/v2.6/me/messenger_profile',
  // Your react App
  app: App
});


// static documentation website
bot.server.use(express.static(path.join(__dirname, '../website/build/react-messenger-ui')));

// seed db
bot.onSync('beforeStart', async ()=>{
  await sequelize.sync({ force: true })
  console.log('test start')
  await Promise.all(seed.map(async reply=>await Reply.create(reply)))
  console.log('finish seed')
})

// dynamic coding
bot.onSync('optinEvent', async event => {
   const autoReply = await getRepliesByKey(event.optin.ref.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());
   console.log('auto reply:', autoReply);
   if(autoReply) event.optin.autoReply = autoReply;
})

bot.onSync('message', async message => {
   const autoReply = await getRepliesByKey(message.text.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());
   console.log('auto reply:', autoReply);
   if(autoReply) message.autoReply = autoReply;
})

// Create REST resource for dynamic codes
bot.on('initRoutes', server=>{

    // resful routes
    epilogue.initialize({
      app: server,
      sequelize
    })

    const replyResource = epilogue.resource({
      model: Reply,
      endpoints: ['/reply', '/reply/:id'],
      actions: ['create', 'update']
    });

    replyResource.create.write.before((req,res, context)=> {
      req.body.key = hri.random().replace(/-/g, ' ');
      return context.continue;
    })
})

bot.start();