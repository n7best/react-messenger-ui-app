---
id: templateOpenGraph
title: OpenGraph Template
---

The Open Graph template allows you to send a structured message with an open graph URL, plus an optional button. Currently, only sharing songs is supported. The song will appear in a bubble that allows the message recipient to see album art, and preview the song. Component includes `OpenGraphTemplate` which contains max of 1 `OpenGraphElement`.

## Example

```BotWebPlayer path=opengraphtemplate
import React, { Component } from 'react';
import { Message, OpenGraphTemplate, OpenGraphElement, URLButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <OpenGraphTemplate>
          <OpenGraphElement url="https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb">
            <URLButton url="https://en.wikipedia.org/wiki/Rickrolling">
              View More
            </URLButton>
          </OpenGraphElement>
        </OpenGraphTemplate>
      </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph)

### OpenGraphElement Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| url      | string | The URL of the open graph page


