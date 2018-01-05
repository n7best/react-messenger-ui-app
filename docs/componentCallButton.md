---
id: componentCallButton
title: Call Button
---

Button that trigger call action from phone

## Example

```BotWebPlayer path=callbutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, PostbackButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Call Button
          <CallButton payload="+16505551234">
            Call Phone Number
          </CallButton>
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/call)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| payload  | string | the phone number button trigger

