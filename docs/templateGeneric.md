---
id: templateGeneric
title: Generic Template
---

The generic template allows you to send a structured message that includes an image, text and buttons. Component includes `GenericTemplate` which contains max of 10 `GenericElement`.

## Example

```BotWebPlayer path=generictemplate
import React, { Component } from 'react';
import { Message, GenericTemplate, GenericElement, URLButton, PostbackButton } from 'react-messenger-ui';

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
              <URLButton url="https://www.oculus.com/en-us/rift/">
                Open Web URL
              </URLButton>
              <PostbackButton payload="magic payload">
                Call Postback
              </PostbackButton>
            </GenericElement>
          </GenericTemplate>
        </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/generic)

### GenericTemplate Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| sharable | boolean | Set to `true` to enable the native share button in Messenger for the template message
| imageAspectRatio| string | One of [IMAGE_ASPECT_RATIO](constants.html#image-aspect-ratio)

### GenericElement Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | The title of the element
| subtitle | string | The subtitle of the element
| image_url| string | image url of the element
| default_action | Object | action executed when the element is tapped

