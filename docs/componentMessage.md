---
id: componentMessage
title: Message
---

Parent wrapper for message display.

## Example

```BotWebPlayer path=helloworld
import React, { Component } from 'react';
import { Message, Text } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <Text>Hello World!</Text>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/send-api)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| type     | string | One of [MESSAGE_TYPE](constants.html#message-type)         |
| recipient| object | [recipient](https://developers.facebook.com/docs/messenger-platform/reference/send-api#recipient) object obtain from API, usually `sender` in the message event
| notificationType  | string | One of [NOTIFICATION_TYPE](constants.html#notification-type)         |
| tag      | string | One of [TAGS](constants.html#tags)         |
