---
id: componentSenderAction
title: SenderAction
---

Output send actions such as typing, not typing or read.

## Example

```BotWebPlayer path=senderaction
import React from 'react';
import { SenderAction, CONSTANTS } from 'react-messenger-ui';

const Typing = ({ recipient }) => {
    return (
       <SenderAction action={CONSTANTS.SENDER_ACTIONS.TYPING_ON} recipient={recipient} />
    )
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| action     | string | One of [SENDER_ACTIONS](constants.html#sender-actions)         |
| recipient| object | [recipient](https://developers.facebook.com/docs/messenger-platform/reference/send-api#recipient) object obtain from API, usually `sender` in the message event
