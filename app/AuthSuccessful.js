import React from 'react';
import { Message, Text } from 'react-messenger-ui';
import EditorReply from './EditorReply';


const AuthSuccessful = async (props) => {
    const { recipient, autoReply } = this.props;

    console.log('auth success', this.props)

    if(autoReply){
      return (
        <EditorReply recipient={recipient} srcCode={autoReply.response}/>
      )
    }

    return (
      <Message recipient={recipient}>
         <Text>Authentication successful</Text>
      </Message>
    )
}
export default AuthSuccessful;