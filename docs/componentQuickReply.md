---
id: componentQuickReply
title: QuickReply
---

You can include `QuickReply` component inside of `Message` component do display quick replies.

## Example

```BotWebPlayer path=quickreply
import React, { Component } from 'react';
import { Message, Text, QuickReply } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <Text>What's your favorite movie genre?</Text>
        <QuickReply title="Search" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION>"/>
        <QuickReply title="Comedy" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY>"/>
        <QuickReply title="Drama" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA>"/>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| type     | string | One of [QUICKREPLY_TYPE](constants.html#quickreply-type)         |
| title    | string | text to display for quick reply |
| payload  | string | payload will be send back to the message hook after user interaction |
| image    | string | image url to display before the quick reply

