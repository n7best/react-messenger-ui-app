import React from 'react';
import { Message, Text } from 'react-messenger-ui';

const NewuserView = ({ recipient }) => (
    <Message recipient={recipient}>
       <Text>Welcome! Use the menu or try command like image, gif, button, generic, media, receipt or opengraph</Text>
    </Message>
)

export default NewuserView;