import React from 'react';
import { Message, Text, ButtonTemplate, GenericTemplate, GenericElement, ListTemplate, ListElement,
URLButton, PostbackButton, CallButton, Attachment, QuickReply, CONSTANTS } from 'react-messenger-ui';

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

    case 'quick reply':
      return (
        <Message recipient={recipient}>
          <Text>What's your favorite movie genre?</Text>
          <QuickReply title="Search" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION>"/>
          <QuickReply title="Comedy" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY>"/>
          <QuickReply title="Drama" payload="<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA>"/>
        </Message>
      )

    case 'button':
      return (
        <Message recipient={recipient}>
          <ButtonTemplate>
            This is test text
            <URLButton url="https://www.oculus.com/en-us/rift/">
              Open Web URL
            </URLButton>
            <PostbackButton payload="DEVELOPER_DEFINED_PAYLOAD">
              Trigger Postback
            </PostbackButton>
            <CallButton payload="+16505551234">
              Call Phone Number
            </CallButton>
          </ButtonTemplate>
        </Message>
      )

    case 'generic':
      return (
        <Message recipient={recipient}>
          <GenericTemplate>
            <GenericElement
              title="rift"
              subtitle="next-generation virtual reality"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/rift/">
                Open Web URL
              </URLButton>
              <PostbackButton payload="magic payload">
                Call Postback
              </PostbackButton>
            </GenericElement>
            <GenericElement
              title="touch"
              subtitle="Your Hands, Now in VR"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/touch.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/touch/">
                Open Web URL
              </URLButton>
              <PostbackButton payload="magic payload">
                Call Postback
              </PostbackButton>
            </GenericElement>
          </GenericTemplate>
        </Message>
      )

    case 'list':
      return (
        <Message recipient={recipient}>
          <ListTemplate>
            <ListElement
              title="rift"
              subtitle="next-generation virtual reality"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/rift/">
                Open Web URL
              </URLButton>
            </ListElement>
            <ListElement
              title="touch"
              subtitle="Your Hands, Now in VR"
              imageUrl="https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/touch.png?raw=true"
            >
              <URLButton url="https://www.oculus.com/en-us/touch/">
                Open Web URL
              </URLButton>
            </ListElement>
            <URLButton url="https://www.oculus.com/en-us/touch/">
              Open Web URL
            </URLButton>
          </ListTemplate>
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