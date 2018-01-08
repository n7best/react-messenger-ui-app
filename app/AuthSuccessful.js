import React from 'react';
import { Message, Text } from 'react-messenger-ui';
import EditorReply from './EditorReply';
import { getRepliesByKey } from '../db';

class AuthSuccessful extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        isAutoReply: false,
        code: false,
      }
    }

    async componentWillMount(){
      const { ref } = this.props;

      if(ref){
        let autoReply = await getRepliesByKey(ref.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

        if(autoReply){
          this.setState({
            code: autoReply.response
          })
        }
      }
    }

    render(){
      const { recipient } = this.props;
      const { isAutoReply, code } = this.state;

      if(isAutoReply){
        return (
          <EditorReply recipient={recipient} srcCode={code} />
        )
      }

      return (
          <Message recipient={recipient}>
             <Text>Authentication successful</Text>
          </Message>
      )
    }
}

export default AuthSuccessful;