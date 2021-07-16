/** @jsx React.DOM */

$(function() {
  function initChat(username, container) {
    React.renderComponent(
      <ChatBox chatProxy={new ChatEmmiter()} username={username}></ChatBox>,
      container
    );
  }

  const usernameInput = $('#username-input');

  usernameInput.trigger('focus');

  const usernameHolder = $('#chat-username');

  function onAction() {
    const username = usernameInput.val().trim();

    if (!username) {
      return;
    }

    const container = $('#container')[0];

    initChat(username, container);
    usernameHolder.html(username);
    console.log(`Chat initialized with username: ${username}`)
  }

  usernameInput.on('keypress', function(event) {
    if (event.keyCode === 13) {
      onAction();
    }
  });

  $('#connect-btn').on('click', onAction);

  // TODO: delete
  const tmpUsername = Math.random().toString(36).substring(7);
  usernameInput.val(tmpUsername);
  onAction();
})
