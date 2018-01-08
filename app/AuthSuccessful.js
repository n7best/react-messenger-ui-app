import React from 'react';
import { Message, Text } from 'react-messenger-ui';

const AuthSuccessful = ({ recipient }) => (
    <Message recipient={recipient}>
       <Text>Authentication successful</Text>
    </Message>
)

export default AuthSuccessful;