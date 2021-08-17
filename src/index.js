import './styles/bootstrap.css';
import './styles/style.css';
import Container from './domLoader.js';
import dragNdrop from './dragndrop.js'

let TodoList = [`Click on the text to edit`, `Drag 'n drop to reorder your list`, `Manage all your lists in one place`, `Resync to clear out the old`];

const deleteTodo = (TodosContainer, value) => {
    let todosText = TodosContainer.querySelectorAll('p');
    let todosArray = [];
    todosText.forEach((item)=> {
        if (item.textContent !== value){
            todosArray.push(item.textContent);
        }
    });
    TodoList = todosArray;
    printTodoList();
};

const printTodo = (item, TodosContainer) => {
    const Todo = document.createElement('li');
    Todo.classList.add('list-group-item', 'd-flex', 'align-items-center'
    ,'p-3', 'justify-content-between');
    Todo.draggable = true;
    
    const checkInput = document.createElement('input');
    checkInput.classList.add('m-0');
    checkInput.type = 'checkbox';
    Todo.appendChild(checkInput);

    const text = document.createElement('p');
    text.classList.add('mx-2', 'my-0');
    text.textContent = item;
    Todo.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebutton');
    Todo.appendChild(deleteButton);

    deleteButton.addEventListener('click', ()=> {
        deleteTodo(TodosContainer, text.textContent);
    });

    TodosContainer.appendChild(Todo);
};

const addTodo = (e, Todos_Container, value) => {
    if (e.key === 'Enter') {
        let todosText = Todos_Container.querySelectorAll('p');
        let todosArray = [];
        todosText.forEach((item)=> {
            todosArray.push(item.textContent);
        });
        todosArray.push(value);
        TodoList = todosArray;
        printTodoList();
    }
};

const printTodoList = () => {
    Container.innerHTML = ``;
    const todosNform = document.createElement('div');

    const formContainer = document.createElement('ul');
    formContainer.classList.add('d-flex', 'flex-column'
    , 'p-2', 'm-0','list-group');
    todosNform.appendChild(formContainer);

    const liContainer1 = document.createElement('li');
    liContainer1.classList.add('list-group-item');
    todosNform.appendChild(liContainer1);

    const todoLabel = document.createElement('label');
    todoLabel.textContent = 'Demo';
    liContainer1.appendChild(todoLabel);

    const liContainer2 = document.createElement('li');
    liContainer2.classList.add('list-group-item');
    todosNform.appendChild(liContainer2);

    const todoInput = document.createElement('input');
    todoInput.classList.add('todoInput');

    todoInput.placeholder = 'Add to your list...';
    liContainer2.appendChild(todoInput);

    const TodosContainer = document.createElement('ul');
    TodosContainer.classList.add('list-group', 'bg-dark', 'mt-2');

    TodoList.forEach((item)=> {
        printTodo(item, TodosContainer);
    });
    todosNform.appendChild(TodosContainer);
    Container.appendChild(todosNform);


    TodosContainer.ondragstart = dragNdrop(TodosContainer);
    

    todoInput.addEventListener('keypress', (e) => {
        addTodo(e, TodosContainer, todoInput.value);
    });
};

printTodoList();
