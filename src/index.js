import './styles/bootstrap.css';
import './styles/style.css';
import Container from './domLoader.js';
import dragNdrop from './dragndrop.js'
import myTodoList from './constructor.js'

myTodoList.new(false, `Click on the text to edit`);
myTodoList.new(false, `Drag 'n drop to reorder your list`);
myTodoList.new(false, `Manage all your lists in one place`);
myTodoList.new(false, `Resync to clear out the old`);

const deleteTodo = (value) => {
    myTodoList.delete(value);
    printTodoList();
};

const printTodo = (item, TodosContainer) => {
    const Todo = document.createElement('li');
    Todo.classList.add('list-group-item', 'd-flex', 'align-items-center'
    ,'p-3', 'justify-content-between');
    Todo.draggable = true;

    const indexInput = document.createElement('input');
    indexInput.type = 'hidden';
    indexInput.id = 'index';
    indexInput.value = item.index;
    Todo.appendChild(indexInput);
    
    const checkInput = document.createElement('input');
    checkInput.classList.add('m-0');
    checkInput.type = 'checkbox';
    checkInput.checked = item.completed;
    Todo.appendChild(checkInput);

    const text = document.createElement('p');
    text.classList.add('mx-2', 'my-0');
    text.textContent = item.description;
    Todo.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebutton');
    Todo.appendChild(deleteButton);

    deleteButton.addEventListener('click', ()=> {
        deleteTodo(item);
    });

    TodosContainer.appendChild(Todo);
};

const addTodo = (e, value) => {
    if (e.key === 'Enter') {
        myTodoList.new(false, value);
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

    TodosContainer.innerHTML = ``;

    myTodoList.list.forEach((item)=> {
        printTodo(item, TodosContainer);
    });
    todosNform.appendChild(TodosContainer);
    Container.appendChild(todosNform);


    TodosContainer.ondragstart = dragNdrop(TodosContainer, myTodoList);
    

    todoInput.addEventListener('keypress', (e) => {
        addTodo(e, todoInput.value);
    });
};

printTodoList();
