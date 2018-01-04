---
id: basics
title: Learn Basics
---

## The Basics

React Messenger UI is like React, but it uses bot components instead of web components as building blocks. So to understand the basic structure of a React Messenger UI app, you should already understand some of the basic React concepts `JSX` and [`Messenger Platform`](https://developers.facebook.com/docs/messenger-platform)


### Hello World

In accordance with the golden programming rule, we must something say "Hello world" frist.

```BotWebPlayer path=helloworld
import React, { Component } from 'react';
import { Message, Text } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
        <Text>Hello World!</Text>
      </Message>
    );
  }
}
```

If you are feeling curious, you can play around with sample code directly in the editor and click send to messenger, our demo bot will try to complie your code and render the respond to you. You can also test it on your Messenger by saying the keyword display in Reply To field.