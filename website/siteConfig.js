const RemarkablePlugins = require('./core/RemarkablePlugins');

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'n7best',
    image: '/test-site/img/logo.png',
    infoLink: 'https://github.com/n7best',
    pinned: true,
  },
];

const siteConfig = {
  title: 'React Messenger UI' /* title for your website */,
  organizationName: 'n7best',
  tagline: 'Build Bot using JavaScript and React',
  url: 'https://n7best.github.io/react-messenger-ui' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'react-messenger-ui',
  headerLinks: [
    {doc: 'quick-start', label: 'Docs'},
    { href: "https://github.com/n7best/react-messenger-ui", label: "GitHub" },
    { href: "https://github.com/n7best/react-messenger-ui-app", label: "Demo Bot Repo" },
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#0081ff',
    secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' n7best',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  markdownPlugins: [
    RemarkablePlugins.BotWebPlayer,
  ],
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-light',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/n7best/react-messenger-ui',
  facebookAppId: '1887139748264265'
};

module.exports = siteConfig;
