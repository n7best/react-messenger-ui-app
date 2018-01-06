"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  key: "helloworld",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><Text>Hello World!</Text></Message>); }}"
}, {
  key: "senderaction",
  response: "const Typing = ({ recipient }) =>{ return (<SenderAction action={CONSTANTS.SENDER_ACTIONS.TYPING_ON} recipient={recipient} />) }"
}, {
  key: "attachment",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><Attachment url=\"https://react-messenger-ui.herokuapp.com/img/logo.png\" /></Message>); }}"
}, {
  key: "quickreply",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><Text>What's your favorite movie genre?</Text><QuickReply title=\"Search\" payload=\"<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION>\"/><QuickReply title=\"Comedy\" payload=\"<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY>\"/><QuickReply title=\"Drama\" payload=\"<DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA>\"/></Message>); }}"
}, {
  key: "urlbutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>URL Button<URLButton url=\"https://www.oculus.com/en-us/rift/\">Open Web URL</URLButton></ButtonTemplate></Message>); }}"
}, {
  key: "postbackbutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>Postback Button<PostbackButton payload=\"DEVELOPER_DEFINED_PAYLOAD\">Trigger Postback</PostbackButton></ButtonTemplate></Message>); }}"
}, {
  key: "sharebutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><GenericTemplate><GenericElement title=\"rift\" subtitle=\"next-generation virtual reality\" imageUrl=\"https://github.com/fbsamples/messenger-platform-samples/blob/master/node/public/assets/rift.png?raw=true\" ><ShareButton /></GenericElement></GenericTemplate></Message>); } }"
}, {
  key: "callbutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>Call Button<CallButton payload=\"+16505551234\">Call Phone Number</CallButton></ButtonTemplate></Message>); } }"
}, {
  key: "loginbutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>Login Button<LoginButton url=\"https://www.oculus.com/en-us/rift/\" /></ButtonTemplate></Message>); } }"
}, {
  key: "logoutbutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>Logout Button<LogoutButton /></ButtonTemplate></Message>); } }"
}, {
  key: "gameplaybutton",
  response: "class AwesomeChatBot extends Component { render() { const { recipient } = this.props; return (<Message recipient={recipient}><ButtonTemplate>Game Button<GameplayButton payload=\"DEVELOPER_DEFINED_PAYLOAD\">Play Game</GameplayButton></ButtonTemplate></Message>); } }"
}];