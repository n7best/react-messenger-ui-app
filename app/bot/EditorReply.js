import React, { Component } from 'react'
import * as ReactMessengerUI from 'react-messenger-ui';
import { transform } from 'buble';

class EditorReply extends Component {

  render() {

    try{
      const { recipient, srcCode } = this.props

      const opts = {
        transforms: {
          dangerousForOf: true,
          dangerousTaggedTemplateString: true
        }
      }

      let transCode = transform(srcCode, opts).code;
      let finalCode = transCode.trim().replace(/^var \w+ =/, '').replace(/;$/, '');
      finalCode = `return (${finalCode})`;
      //console.log('final code', finalCode)

      const scope = { React, Component, ...ReactMessengerUI }

      const scopeKeys = Object.keys(scope)
      const scopeValues = scopeKeys.map(key => scope[key])

      const evalFn = new Function('React', ...scopeKeys, finalCode);

      const ReplyComponent = evalFn(React, ...scopeValues)

      return <ReplyComponent recipient={recipient} />

    }catch(e){
      console.log('err', e)
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