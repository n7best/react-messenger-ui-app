import React, { Component } from 'react'
import * as ReactMessengerUI from 'react-messenger-ui';
import { transform } from 'buble';
const vm = require('vm');

class EditorReply extends Component {

  render() {
    try{
      const sandbox = { result: null, React, Component, ...ReactMessengerUI };
      const { recipient, srcCode } = this.props
      const opts = {
        transforms: {
          dangerousForOf: true,
          dangerousTaggedTemplateString: true,
          modules: false
        }
      }

      // create vm to isolate code excution
      vm.createContext(sandbox);

      let transCode = transform(srcCode, opts).code;
      let finalCode = transCode.trim().replace(/^var \w+ =/, '').replace(/;$/, '');
      finalCode = `result = (${finalCode})`;
      // console.log('final code', finalCode)

      vm.runInContext(finalCode, sandbox);

      // console.log('final result: ',sandbox.result);
      // const ReplyComponent = evalFn(React, ...scopeValues)
      const ReplyComponent = sandbox.result;
      return <ReplyComponent recipient={recipient} />

    }catch(e){
      console.log('err', e.message)
      const { recipient } = this.props
      const { Message, Text } = ReactMessengerUI;

      return (
        <Message recipient={recipient}>
          <Text>
            { `Error! ${e.message}`}
          </Text>
        </Message>
      );
    }
  }
}

export default EditorReply;