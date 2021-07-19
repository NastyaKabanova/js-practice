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

  const themeDay = $('#theme-day');
  const themeNight = $('#theme-night');

  const dayColors = {
    '--primary': '#006d77',
    '--secondary': 'white',
    '--bg': '#9fc0dc',
    '--accent-1': '#ffb600',
    '--accent-2': '#ff8700',
    '--text': 'white',
  };

  const nightColors = {
    '--primary': '#8ecae6',
    '--secondary': '#75acb9',
    '--bg': '#023047',
    '--accent-1': '#ffb703',
    '--accent-2': '#ff8700',
    '--text': 'white',
  };

  themeNight.hide();

  themeDay.on('click', function() {
    themeDay.hide();
    themeNight.show();
    Object.entries(dayColors).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];

      document.documentElement.style.setProperty(key, value);
    })
  });

  themeNight.on('click', function() {
    themeDay.show();
    themeNight.hide();
    Object.entries(nightColors).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];

      document.documentElement.style.setProperty(key, value);
    })
  });

  themeDay.trigger('click');
})
