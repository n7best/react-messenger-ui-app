---
id: componentLogoutButton
title: Logout Button
---

Button that trigger the account unlinking flow.

## Example

```BotWebPlayer path=logoutbutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, LogoutButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Logout Button
          <LogoutButton />
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/logout)



