import React from 'react';
import { Message, Text, QuickReply, CONSTANTS } from 'react-messenger-ui';

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const TryFeaturesView = (props) => {

  const { recipient } = props;
  const features = ['image', 'gif', 'audio', 'video', 'file', 'button', 'generic template', 'list', 'media', 'receipt', 'opengraph']

  return (
    <Message recipient={recipient}>
      <Text>Try some awesome features?</Text>
      {
          features.map(feature=><QuickReply key={feature} title={capitalize_Words(feature)} payload={feature}/>)
      }
    </Message>
  )
}

export default TryFeaturesView;