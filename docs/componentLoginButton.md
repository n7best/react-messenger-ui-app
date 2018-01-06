---
id: componentLoginButton
title: Login Button
---

Button that trigger [account linking authentication flow](https://developers.facebook.com/docs/messenger-platform/account-linking/authentication).

## Example

```BotWebPlayer path=loginbutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, LoginButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Login Button
          <LoginButton
            url="https://www.oculus.com/en-us/rift/"
          />
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/login)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| url  | string | Authentication callback URL. Must use HTTPS protocol.

