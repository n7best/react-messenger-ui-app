---
id: componentURLButton
title: URL Button
---

Button that bring up webview to display an url, use with various templates.

## Example

```BotWebPlayer path=urlbutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, URLButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Display an URL Button
          <URLButton url="https://www.oculus.com/en-us/rift/">
            Open Web URL
          </URLButton>
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/url)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| url         | string | This URL is opened in a mobile browser when the button is tapped.
| fallbackUrl | string | The URL to use on clients that don't support Messenger Extensions.
| webviewHeightRatio| string | One of [WEBVIEW_HEIGHT_RATIO](constants.html#webview-height-ratio)
| messengerExtensions  | Boolean | Must be true if using Messenger Extensions.
| webviewShareButton   | string | Set to hide to disable the share button in the Webview.
