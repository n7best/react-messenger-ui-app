import React from 'react';
import { SenderAction, CONSTANTS } from 'react-messenger-ui';

const Typing = ({ recipient, typing }) => {
    const action = typing ? CONSTANTS.SENDER_ACTIONS.TYPING_ON : CONSTANTS.SENDER_ACTIONS.TYPING_OFF;

    return (
       <SenderAction action={action} recipient={recipient} />
    )
}

export default Typing;