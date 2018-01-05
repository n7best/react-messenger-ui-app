"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  key: "helloworld",
  response: "class AwesomeChatBot extends Component {  render() {  const { recipient } = this.props;  return (      <Message recipient={recipient}>        <Text>Hello World!</Text>      </Message>    );  }}"
}, {
  key: "senderaction",
  response: "const Typing = ({ recipient }) => { return ( <SenderAction action={CONSTANTS.SENDER_ACTIONS.TYPING_ON} recipient={recipient} /> ) }"
}, {
  key: "attachment",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return ( <Message recipient={recipient}> <Attachment url=\"https://react-messenger-ui.herokuapp.com/img/logo.png\" /> </Message> ); }}"
}];