import React from 'react';
import { Message, Text } from 'react-messenger-ui';
import EditorReply from './EditorReply';
import { getRepliesByKey } from '../db';

class AuthSuccessful extends React.Component {

    async render(){
      const { recipient, params } = this.props;

      const autoReply = await getRepliesByKey(params.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());

      console.log('render auth', params, this.props, autoReply);

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
}

export default AuthSuccessful;