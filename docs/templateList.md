---
id: tempalteList
title: List Template
---

The list template allows you to send a structured message with a set of items rendered vertically. Component includes `ListTemplate` which contains max of 10 `ListElement`.

## Example

```BotWebPlayer path=listtemplate
import React, { Component } from 'react';
import { Message, ListTemplate, ListElement, URLButton } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
          <ListTemplate>
            <ListElement
              title="rift"
              subtitle="next-generation virtual reality"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/rift/">
                Open Web URL
              </URLButton>
            </ListElement>
            <ListElement
              title="touch"
              subtitle="Your Hands, Now in VR"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/touch.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/touch/">
                Open Web URL
              </URLButton>
            </ListElement>
            <URLButton url="https://www.oculus.com/en-us/touch/">
              Open Web URL
            </URLButton>
          </ListTemplate>
        </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/list)

### ListTemplate Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| sharable | boolean | Set to `true` to enable the native share button in Messenger for the template message
| topElementStyle| string | One of [TOP_ELEMENT_STYLE](constants.html#top-element-style)

### ListElement Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | The title of the element
| subtitle | string | The subtitle of the element
| imageUrl| string | image url of the element
| default_action | Object | action executed when the element is tapped

