---
id: basics
title: Learn Basics
---

## The Basics

React Messenger UI is like React, but it uses bot components instead of web components as building blocks. So to understand the basic structure of a React Messenger UI app, you should already understand some of the basic React concepts `JSX`.


### Hello World


```BotWebPlayer path=helloworld
import React, { Component } from 'react';
import { Message, Text } from 'react-messenger-ui';
class AwesomeChatBot extends Component {
  render() {
    return (
      <Message recipient={recipient}>
        <Text>Hello World!</Text>
      </Message>
    );
  }
}
```