/** @jsx React.DOM */

'use strict';

var ChatMessage = React.createClass({
  render: function() {
    var message = this.props.message;
    var hours = message.date.getHours();
    var minutes = message.date.getMinutes();
    var time = '[' + hours + ':' + minutes + ']';
    var className = "chat-message";

    if (message.self) {
      className += " self"
    }

    return (
      <div className={className}>
        <div className="chat-message-time">{time}</div>
        <div className="chat-message-author">{message.author}:</div>
        <div className="chat-message-content">{message.content}</div>
      </div>
    )
  },
})
