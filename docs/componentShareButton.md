---
id: componentShareButton
title: Share Button
---

Button that enable to share content.

**Sharecontent is currently Work in progress**

## Example

```BotWebPlayer path=sharebutton
import React, { Component } from 'react';
import { Message, GenericTemplate, GenericElement, ShareButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <GenericTemplate>
            <GenericElement
              title="rift"
              subtitle="next-generation virtual reality"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true"
            >
              <ShareButton />
            </GenericElement>
        </GenericTemplate>
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
