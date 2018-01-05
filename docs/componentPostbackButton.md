---
id: componentPostbackButton
title: Postback Button
---

Button that sends predefine paylaod back to webhook after user interaction

## Example

```BotWebPlayer path=postbackbutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, PostbackButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Postback Button
          <PostbackButton payload="DEVELOPER_DEFINED_PAYLOAD">
              Trigger Postback
           </PostbackButton>
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| payload         | string | the payload send back to webhook after user interaction

