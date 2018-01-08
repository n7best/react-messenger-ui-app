import React from 'react';
import { Message, Text } from 'react-messenger-ui';

const NotFoundView = ({recipient}) => (
  <Message recipient={recipient}>
    <Text> Sorry, try something different? </Text>
  </Message>
)

export default NotFoundView;