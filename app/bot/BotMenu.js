import React from 'react';
import { PersistentMenu, NestedMenu, Menu, URLButton, PostbackButton } from 'react-messenger-ui';

const BotMenu = () => (
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
)

export default BotMenu;