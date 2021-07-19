/** @jsx React.DOM */

'use strict';

var ChatBox = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },

  componentDidMount: function() {
    this.chatEmitter = this.props.chatProxy;
    this.chatEmitter.connect(this.props.username);
    this.chatEmitter.onMessage(this.addMessage.bind(this));
    this.chatEmitter.onUserConnected(this.userConnected.bind(this));
    this.chatEmitter.onUserDisconnected(this.userDisconnected.bind(this));
  },

  userConnected: function (user) {
    var users = this.state.users;
    users.push(user);
    this.setState({
      users: users
    });
  },

  userDisconnected: function (user) {
    var users = this.state.users;
    users.splice(users.indexOf(user), 1);
    this.setState({
      users: users
    });
  },

  messageHandler: function (message) {
    this.addMessage({
      content: message,
      author : this.chatEmitter.getUsername(),
      self: true,
    });
    this.chatEmitter.broadcast(message);
  },

  addMessage: function (message) {
    if (message) {
      message.date = new Date();
      this.refs.messagesList.addMessage(message);
    }
  },

  render: function() {
    return (
      <div className="chat-box" ref="root">
        <div className="row">
          <h3 className="col-xs-9 col-md-8 col-lg-8">Chat</h3>
          <h3 className="col-xs-3 col-md-4 col-lg-4">My Dudes</h3>
        </div>
        <div className="chat-content row row-no-gutters">
          <div className="col-xs-9 col-md-8 col-lg-8">
            <MessagesList ref="messagesList"></MessagesList>
          </div>
          <div className="col-xs-3 col-md-4 col-lg-4">
            <UsersList users={this.state.users} ref="usersList"></UsersList>
          </div>
        </div>
        <MessageInput ref="messageInput" messageHandler={this.messageHandler}></MessageInput>
      </div>
    )
  }
});
