import React, { Component } from 'react'
import * as ReactMessengerUI from 'react-messenger-ui';
import { transform } from 'babel-core';

class EditorReply extends Component {

  render() {

    try{
      const { recipient, srcCode } = this.props

      let transCode = transform(srcCode, {"presets": ["env", "stage-0", "react"], "plugins": ["transform-remove-strict-mode", "add-module-exports"]}).code;
      let finalCode = transCode.trim()
      .replace(/^var \w+ =/, '')
      .replace(/;$/, '');

      const scope = { React, Component, ...ReactMessengerUI }

      const scopeKeys = Object.keys(scope)
      const scopeValues = scopeKeys.map(key => scope[key])

      const evalFn = new Function('React', ...scopeKeys, `return (${finalCode})`);
      const ReplyComponent = evalFn(React, ...scopeValues)

      return <ReplyComponent recipient={recipient} />

    }catch(e){
      const { recipient } = this.props
      const { Message, Text } = ReactMessengerUI;

      return (
        <Message recipient={recipient}>
          <Text>
            Error Occured while compling your code!
          </Text>
        </Message>
      );
    }
  }
}

export default EditorReply;