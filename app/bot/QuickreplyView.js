import React from 'react';
import { Message, Text } from 'react-messenger-ui';

const QuickreplyView = ({recipient, quick_reply, text, type}) => (
  <Message recipient={recipient}>
    <Text>You tab quick reply: {text}</Text>
  </Message>
)

export default QuickreplyView;