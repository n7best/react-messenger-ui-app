import React, { Component } from 'react'
import * as ReactMessengerUI from 'react-messenger-ui';
import { transform } from 'buble';
const vm = require('vm');

class EditorReply extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('error', error, info)
    this.setState({
      hasError: error
    })
  }

  renderError(e){
    console.log('err', e ? e.message : this.state.hasError.message)
    const { recipient } = this.props
    const { Message, Text } = ReactMessengerUI;

    return (
      <Message recipient={recipient}>
        <Text>
          { `Error! ${this.state.hasError.message}`}
        </Text>
      </Message>
    );
  }

  render() {
    if (this.state.hasError) return this.renderError();
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

      // remove any escape
      let transCode = transform(srcCode.replace(/\\/g, ""), opts).code;
      let finalCode = transCode.trim().replace(/^var \w+ =/, '').replace(/;$/, '');
      finalCode = `result = (${finalCode})`;
      // console.log('final code', finalCode)

      try{
        vm.runInContext(finalCode, sandbox, { displayErrors: true });

      } catch (e) {
        throw e;
      }

      // console.log('final result: ',sandbox.result);
      // const ReplyComponent = evalFn(React, ...scopeValues)
      const ReplyComponent = sandbox.result;
      return <ReplyComponent recipient={recipient} />

    }catch(e){
      return this.renderError(e);
    }
  }
}

export default EditorReply;