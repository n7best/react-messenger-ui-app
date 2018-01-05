---
id: componentShareButton
title: Share Button
---

Button that enable to share content.

**Sharecontent is currently Work in progress**

## Example

```BotWebPlayer path=sharebutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, ShareButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Display an Share Button
          <ShareButton>
              Trigger Share
           </ShareButton>
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/share)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| shareContents  | string | not yet avaiable, work in progress
