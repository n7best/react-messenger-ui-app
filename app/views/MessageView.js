import React from 'react';
import config from 'config';
import { Message, Text, ButtonTemplate, URLButton, Attachment, CONSTANTS } from 'react-messenger-ui';

const MessageView = (props) => {

  const { recipient, text } = props;

  switch (text.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {
    case 'image':
      return (
        <Message recipient={recipient}>
          <Attachment url="https://github.com/n7best/react-messenger-ui/blob/master/website/static/img/logo.png?raw=true" />
        </Message>
      )

    case 'gif':
      return (
        <Message recipient={recipient}>
          <Attachment url="https://media.giphy.com/media/3o7aCZEf0e3Bbo7Krm/source.gif" />
        </Message>
      )

    case 'audio':
      return (
        <Message recipient={recipient}>
          <Attachment
            type={CONSTANTS.ATTACHMENT_TYPE.AUDIO}
            url="http://www.noiseaddicts.com/samples_1w72b820/2237.mp3"
          />
        </Message>
      )

    case 'video':
      return (
        <Message recipient={recipient}>
          <Attachment
            type={CONSTANTS.ATTACHMENT_TYPE.VIDEO}
            url="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/allofus480.mov?raw=true"
          />
        </Message>
      )

    case 'file':
      return (
        <Message recipient={recipient}>
          <Attachment
            type={CONSTANTS.ATTACHMENT_TYPE.FILE}
            url="https://raw.githubusercontent.com/fbsamples/messenger-platform-samples/master/node/public/assets/test.txt"
          />
        </Message>
      )

    default:
      return (
        <Message recipient={recipient}>
          <Text>{ text }</Text>
        </Message>
      )
  }
}

export default MessageView;