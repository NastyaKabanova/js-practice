const buttonEnter = document.getElementById('enter')
const userInput = document.getElementById('userInput')
const ul = document.querySelector('ul')

function inputLength() {
    return userInput.value.length > 0
}

function createTodo() {
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(userInput.value))
    ul.appendChild(li)
    userInput.value = ''

    

    let deleteButton = document.createElement('button')
    deleteButton.appendChild(document.createTextNode('X'))
    li.appendChild(deleteButton)
    deleteButton.addEventListener('click', deleteToDoItem)

    function deleteToDoItem() {
        li.classList.add('delete')
    }
}

function changeListAfterKeypress(event) {
    if (inputLength() && event.which == 13) {
        createTodo()
    }
}

userInput.addEventListener('keypress', changeListAfterKeypress)