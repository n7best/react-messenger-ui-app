---
id: templateButton
title: Button Template
---

The button template allows you to send a structured message that includes text and buttons.

## Example

```BotWebPlayer path=buttontemplate
import React, { Component } from 'react';
import { Message, ButtonTemplate, URLButton, PostbackButton, CallButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
            This is test text
            <URLButton url="https://www.oculus.com/en-us/rift/">
              Open Web URL
            </URLButton>
            <PostbackButton payload="DEVELOPER_DEFINED_PAYLOAD">
              Trigger Postback
            </PostbackButton>
            <CallButton payload="+16505551234">
              Call Phone Number
            </CallButton>
          </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/button)

