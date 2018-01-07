---
id: templateMedia
title: Media Template
---

The media template allows you to send a structured message that includes an image or video, and an optional button. Component includes `MediaTemplate` which contains max of 1 `MediaElement`.

## Example

```BotWebPlayer path=mediatemplate
import React, { Component } from 'react';
import { Message, MediaTemplate, MediaElement } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
          <MediaTemplate>
            <MediaElement
              type={CONSTANTS.MEDIA_TYPE.IMAGE}
              url="https://www.facebook.com/552483055096851/photos/a.552483101763513.1073741825.552483055096851/552484795096677/?type=3&theater"
            />
          </MediaTemplate>
        </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/media)

### MediaElement Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| type     | string | One of [MEDIA_TYPE](constants.html#media-type)
| url      | string | The URL of the image
| attachmentId| string | The attachment ID of the image or video.


