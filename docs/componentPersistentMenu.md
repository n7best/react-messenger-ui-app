---
id: componentPersistentMenu
title: Persistent Menu
---

The persistent menu can be set for your bot to help people discover and more easily access your functionality throughout the conversation. Component includes `PersistentMenu`, `Menu` and `Nested Menu`.

## Example

```
import React, { Component } from 'react';
import { PersistentMenu, Menu, NestedMenu, PostbackButton, URLButton } from 'react-messenger-ui';

class AwesomeChatBotMenu extends Component {
  render() {
    return (
      <PersistentMenu>
        <Menu>
          <PostbackButton payload="BOTPATH:/tryfeatures">
            Try Features
          </PostbackButton>
          <URLButton url="https://github.com/n7best/react-messenger-ui">
            Github
          </URLButton>
          <NestedMenu title="Nested Menu">
            <PostbackButton payload="BOTPATH:/tryfeatures">
              Try Features
            </PostbackButton>
            <URLButton url="https://github.com/n7best/react-messenger-ui">
              Github
          </URLButton>
          </NestedMenu>
        </Menu>
      </PersistentMenu>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu)


