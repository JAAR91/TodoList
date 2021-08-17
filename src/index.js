import { div } from 'prelude-ls';
import './bootstrap/bootstrap.css';
import Container from './domLoader.js';

let TodoList = [`Click on the text to edit`, `Drag 'n drop to reorder your list`, `Manage all your lists in one place`, `Resync to clear out the old`];

const printTodoList = () => {
    const TodoContainer = document.createElement('ul');
    TodoContainer.classList.add('list-group');
   
    TodoList.forEach((item)=> {
        const Todo = document.createElement('li');
        Todo.classList.add('list-group-item');
        Todo.draggable = true;
        Todo.addEventListener('dragstart', (Todo) => { Todo.opacity = '0.4';})
        Todo.addEventListener('dragend', (Todo) => { Todo.opacity = '1';})
        const text = document.createElement('p');
        text.textContent = item;
        Todo.appendChild(text);
        TodoContainer.appendChild(Todo);
    });
    Container.appendChild(TodoContainer);
};

printTodoList();