

$(function () {
  // themes
  $('#theme-light').on('click', function() {
    $('html').removeClass('dark')
  })

  $('#theme-dark').on('click', function() {
    $('html').addClass('dark')
  })

  // color picker
  let currentColor = 'color-3'
  const colors = $('#color-picker-list').children()

  colors.each(function() {
    $(this).on('click', function() {
      currentColor = $(this).attr('id')

      colors.each(function() {
        $(this).removeClass('selected')

        if ($(this).attr('id') == currentColor) {
          $(this).addClass('selected')
        }
      })
    })
  })

  const buttonEnter = $('#enter')
  const userInput = $('#userInput')
  const ul = $('ul')

  // local storage
  const items = JSON.parse(localStorage.getItem('todos') || '[]');

  function saveItems() {
    localStorage.setItem('todos', JSON.stringify(items))
  }

  function addItem(text) {
    const item = {
      id: Date.now(),
      text,
      done: false,
      color: currentColor,
    };

    items.push(item);
    saveItems();

    return item;
  }

  function removeItem(id) {
    const idx = items.findIndex(i => i.id === id)

    if (idx > -1) {
      items.splice(idx, 1)
    }

    saveItems();
  }

  function toggleItem(id) {
    const idx = items.findIndex(i => i.id === id)

    if (idx > -1) {
      items[idx].done = !items[idx].done;
    }

    saveItems();
  }


  // elements
  function createItemDOM(item) {
    const id = item.id;
    const li = $('<li>')
    li.html(item.text);
    ul.append(li)

    li.click(function() {
      toggleItem(id)
      $(this).toggleClass('done')
    })

    if (item.done) {
      li.toggleClass('done')
    }

    li.addClass(item.color)

    const date = new Date(item.id)
    const dateDay = ('0' + (date.getDate())).slice(-2)
    const dateMonth = ('0' + (date.getMonth() + 1)).slice(-2)
    const dateTime = date.getHours() + ":" + date.getMinutes()
    const dateString = dateDay + "." + dateMonth + " - " + dateTime
    const dateCont = $('<div>')
    dateCont.addClass('date')
    dateCont.html(dateString)
    li.append(dateCont)

    const deleteButton = $('<button>')
    deleteButton.html('<i class="fas fa-times"></i>')
    li.append(deleteButton)
    deleteButton.click(function () {
      removeItem(id);
      li.remove();
    })

    const editButton = $('<button>')
    editButton.addClass('edit')
    editButton.html('<i class="fas fa-pencil-alt"></i>')
    li.append(editButton)
    editButton.click(function () {
      // edit
    })
  }

  function renderItems() {
    ul.html('');

    items.forEach((i) => {
      createItemDOM(i)
    });
  }

  function inputLength() {
      return userInput.val().length > 0
  }

  function createTodo() {
    const item = addItem(userInput.val())
    createItemDOM(item);
    userInput.val('')
  }

  function changeListAfterKeypress(event) {
      if (inputLength() && event.which == 13) {
        createTodo()
      }
  }

  function changeListAfterClick() {
      if (inputLength()) {
          createTodo()
      }
  }

  userInput.keypress(changeListAfterKeypress)
  buttonEnter.click(changeListAfterClick);

  renderItems();
});
