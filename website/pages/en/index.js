/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

class HomeSplash extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="projectLogo">
              <img src={siteConfig.baseUrl + 'img/logo.png'} />
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href="https://m.me/552483055096851">Try It Out</Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        'quick-start.html'
                      }>
                      Quick Start
                    </Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        'basics.html'
                      }>
                      Learn Basic
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    let language = this.props.language || 'en';
    const showcase = siteConfig.users
      .filter(user => {
        return user.pinned;
      })
      .map(user => {
        return (
          <a href={user.infoLink}>
            <img src={user.image} title={user.caption} />
          </a>
        );
      });

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
           <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>Build Messenger Bot using JavaScript and React</h2>
              <MarkdownBlock>
                React Messenger UI lets you build Messenger Bot using only JavaScript.
                It uses the same design as React, letting you compose a rich
                bot UI from declarative components.
              </MarkdownBlock>
            </div>
            <MarkdownBlock>
              {`\`\`\`javascript
import React, { Component } from 'react';
import { Message, Text } from 'react-messenger-ui';
class AwesomeChatBot extends Component {
  render() {
    return (
      <Message recipient={recipient}>
        <Text>{ text }</Text>
      </Message>
    );
  }
}
\`\`\``}
            </MarkdownBlock>
          </div>
        </Container>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>Think Component instead of API</h2>
              <MarkdownBlock>
                Messenger Platform provide great sets of API for your bot to provide response, but in the end those JSON is rendering back to UI component and display to the user. This library bridge the gap between this two process, utilize react-reconciler to render this component to the API provide by the platform.
              </MarkdownBlock>
            </div>

            <GridBlock
              contents={[
                {
                  content: `\`\`\`javascript
import React, { Component } from 'react';
import { render, Message, ButtonTemplate, URLButton, PostbackButton, CallButton } from 'react-messenger-ui';
class AwesomeChatBot extends Component {
  render() {
    return (
      <Message recipient={{ id: '<PSID>' }}>
        <ButtonTemplate>
            hello
          <URLButton url="magic link">
            world
          </URLButton>
          <PostbackButton payload="magic payload">
            world
          </PostbackButton>
        </ButtonTemplate>
      </Message>
    );
  }
}

\`\`\``,
                  image: siteConfig.baseUrl + 'img/buttontemplate.png',
                  imageAlign: 'right',
                  title: 'Your Component',
                },
              ]}
            />

            <h3>Transcript to API</h3>
            <MarkdownBlock>
              {`\`\`\`javascript
 {
    "messaging_type": "RESPONSE",
    "recipient": {
        "id": "<PSID>"
    },
    "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "hello",
                "buttons": [
                    {
                        "type": "web_url",
                        "title": "world",
                        "url": "magic link"
                    },
                    {
                        "type": "postback",
                        "title": "world",
                        "payload": "magic payload"
                    }
                ]
            }
        }
    }
}

\`\`\``}
            </MarkdownBlock>
          </div>
        </Container>
        </div>
      </div>
    );
  }
}

module.exports = Index;
