---
id: componentGameplayButton
title: Gameplay Button
---

Button that an launches Instant Game that is associated with the bot page.

## Example

```BotWebPlayer path=gameplaybutton
import React, { Component } from 'react';
import { Message, ButtonTemplate, GameplayButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <ButtonTemplate>
          Game Button
          <GameplayButton payload="DEVELOPER_DEFINED_PAYLOAD">
              Play Game
           </GameplayButton>
        </ButtonTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback)


### Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| payload  | string |  data will be sent to the game.
| game_metadata  | string | Parameters specific to Instant Games include `player_id` and `context_id`
