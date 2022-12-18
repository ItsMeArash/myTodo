const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', removeCompleteTodo);
filterOption.addEventListener('click', filterTodo);
todoInput.addEventListener('keydown', enterKeyHandler);
document.addEventListener('DOMContentLoaded', getTodos);


function getTodos()
{
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo)
    {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function filterTodo(event)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch (event.target.value) {
            case 'all':
                todo.style.display = "flex";
                break;
            case 'completed':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        
        }
    })
}

function enterKeyHandler(event)
{
    if(event.keycode == 13)
    {
        event.preventDefault();
        addTodo();
    }    
}

function removeCompleteTodo(event)
{
    if (event.target.classList[0] === "complete-btn")
    {
        event.target.parentElement.classList.toggle('completed')
    } else if (event.target.classList[0] === "trash-btn")
    {
        event.target.parentElement.remove();
        removeLocalTodo(event.target.parentElement);
    }
}

function addTodo(event)
{
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;

    saveLocalTodos(todoInput.value)

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}


function saveLocalTodos(todo)
{
    let todos;
    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo)
{
    let todos;
    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}