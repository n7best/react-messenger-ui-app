---
id: componentAttachment
title: Attachment
---

Use to attach image, audio, video or file.

## Example

```BotWebPlayer path=attachment
import React, { Component } from 'react';
import { Message, Attachment } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <Attachment url="https://react-messenger-ui.herokuapp.com/img/logo.png" />
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/send-messages/saving-assets)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| type     | string | One of [ATTACHMENT_TYPE](constants.html#attachment-type)  |
| source     | source | One of [ATTACHMENT_SOURCE](constants.html#attachment-source)  |
| reusable | boolean | indicate if attachment is reusable, messenger platform will return with an attachment id
| attachment_id  | string | attachment_id of the attachment |
| file      | file | use when you want to upload the attachment  |
