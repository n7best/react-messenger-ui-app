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
      const { params } = this.props;
      console.log('called component will mount', params);
      if(params){
        let autoReply = await getRepliesByKey(params.replace(/-/g, ' ').replace(/[^\w\s]/gi, '').trim().toLowerCase());
        console.log('found ', autoReply)
        if(autoReply){
          this.setState({
            isAutoReply: true,
            code: autoReply.response
          })
        }
      }
    }

    render(){
      const { recipient, params } = this.props;
      const { isAutoReply, code } = this.state;

      console.log('render auth', params, this.props);

      if(isAutoReply){
        return (
          <EditorReply recipient={recipient} srcCode={code}/>
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