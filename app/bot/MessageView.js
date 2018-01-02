import React from 'react';
import { Message, Text, ButtonTemplate, GenericTemplate, GenericElement, ListTemplate, ListElement,
ReceiptTemplate, ReceiptElement, Summary, Adjustment, Address, MediaTemplate, MediaElement, URLButton,
OpenGraphTemplate, OpenGraphElement, PostbackButton, CallButton, Attachment, QuickReply, CONSTANTS } from 'react-messenger-ui';
import db from '../db';

const MessageView = (props) => {

  const { recipient, text } = props;

  switch (text.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {
    case 'image':
      return (
        <Message recipient={recipient}>
          <Attachment url="https://react-messenger-ui.herokuapp.com/img/logo.png" />
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

    case 'generic template':
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

    case 'media':
      return (
        <Message recipient={recipient}>
          <MediaTemplate>
            <MediaElement
              type={CONSTANTS.MEDIA_TYPE.IMAGE}
              url="https://www.facebook.com/552483055096851/photos/a.552483101763513.1073741825.552483055096851/552484795096677/?type=3&theater"
            />
          </MediaTemplate>
        </Message>
      )

    case 'receipt':
      return (
        <Message recipient={recipient}>
          <ReceiptTemplate
            recipientName="Charlie"
            orderNumber="12345678902"
            paymentMethod="Visa 1234"
            timestamp="1428444852"
          >
            <Address
              street1="1 Hacker Way"
              city="Menlo Park"
              postalCode="94025"
              state="CA"
              country="USA"
            />
            <Summary
              subtotal={75.00}
              shippingCost={4.95}
              totalTax={6.19}
              totalCost={56.14}
            />
            <Adjustment name="New Customer Discount" amount={20} />
            <Adjustment name="$10 Off Coupon" amount={10} />
            <ReceiptElement
              title="Classic White T-shirt"
              subTitle="100% Soft and Luxurious Cotton"
              quantity={2}
              price={50}
              currency="USD"
              imageUrl="http://petersapparel.parseapp.com/img/whiteshirt.png"
            />
            <ReceiptElement
              title="Classic Gray T-shirt"
              subTitle="100% Soft and Luxurious Cotton"
              quantity={1}
              price={25}
              currency="USD"
              imageUrl="http://petersapparel.parseapp.com/img/grayshirt.png"
            />
          </ReceiptTemplate>
        </Message>
      )

    case 'opengraph':
      return (
        <Message recipient={recipient}>
          <OpenGraphTemplate>
            <OpenGraphElement url="https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb">
              <URLButton url="https://en.wikipedia.org/wiki/Rickrolling">
                View More
              </URLButton>
            </OpenGraphElement>
          </OpenGraphTemplate>
        </Message>
      )

    default:
      let result = db.get('replies').find({ key: text }).value();

      if(result){
        console.log('found post', result);
        return (
          <Message recipient={recipient}>
            <Text>{ text }</Text>
          </Message>
        )
      }else{
        return (
          <Message recipient={recipient}>
            <Text>{ text }</Text>
          </Message>
        )
      }

  }
}

export default MessageView;