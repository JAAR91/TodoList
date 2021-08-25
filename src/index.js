import './styles/bootstrap.css';
import './styles/style.css';
import Container from './domLoader.js';
import dragNdrop from './dragndrop.js';
import myTodoList from './constructor.js';

const printTodoList = () => {
  Container.innerHTML = '';
  const todosNform = document.createElement('div');
  todosNform.classList.add('list-group', 'shadow');

  const formContainer = document.createElement('ul');
  formContainer.classList.add('d-flex', 'flex-column',
    'm-0', 'p-0', 'list-group-item');
  todosNform.appendChild(formContainer);

  const liContainer1 = document.createElement('li');
  liContainer1.classList.add('list-group-item');
  formContainer.appendChild(liContainer1);

  const todoLabel = document.createElement('label');
  todoLabel.textContent = 'Demo';
  liContainer1.appendChild(todoLabel);

  const liContainer2 = document.createElement('li');
  liContainer2.classList.add('list-group-item');
  formContainer.appendChild(liContainer2);

  const todoInput = document.createElement('input');
  todoInput.classList.add('todoInput');
  todoInput.placeholder = 'Add to your list...';
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      myTodoList.new(todoInput.value);
      printTodoList();
    }
  });
  liContainer2.appendChild(todoInput);

  const TodosContainer = document.createElement('ul');
  TodosContainer.id = 'TodosContainer';
  TodosContainer.classList.add('m-0', 'p-0', 'list-group-item');

  TodosContainer.innerHTML = '';

  myTodoList.list.forEach((item) => {
    const Todo = document.createElement('li');
    Todo.classList.add('list-group-item', 'd-flex', 'align-items-center',
      'p-3', 'justify-content-between');
    Todo.draggable = true;

    const indexInput = document.createElement('input');
    indexInput.type = 'hidden';
    indexInput.value = item.index;
    Todo.appendChild(indexInput);

    const checkInput = document.createElement('input');
    checkInput.classList.add('m-0');
    checkInput.type = 'checkbox';
    checkInput.checked = item.completed;
    Todo.appendChild(checkInput);

    const text = document.createElement('p');
    text.classList.add('mx-2', 'my-0', 'w-100');
    if (checkInput.checked) {
      text.classList.toggle('text-decoration-line-through');
    }
    checkInput.addEventListener('change', () => {
      myTodoList.completed(indexInput.value, checkInput.checked);
      text.classList.toggle('text-decoration-line-through');
    });
    text.textContent = item.description;
    Todo.appendChild(text);

    const editTodo = document.createElement('input');
    editTodo.classList.add('d-none', 'mx-2', 'w-100');
    editTodo.placeholder = item.description;
    Todo.appendChild(editTodo);

    text.addEventListener('click', () => {
      editTodo.classList.toggle('d-none');
      text.classList.toggle('d-none');
      editTodo.value = '';
      editTodo.focus();
    });

    editTodo.addEventListener('focusout', () => {
      editTodo.classList.toggle('d-none');
      text.classList.toggle('d-none');
    });

    editTodo.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        myTodoList.edit(indexInput.value, editTodo.value);
        printTodoList();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebutton');
    Todo.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      myTodoList.delete(indexInput.value);
      printTodoList();
    });

    TodosContainer.appendChild(Todo);
  });
  todosNform.appendChild(TodosContainer);
  Container.appendChild(todosNform);

  TodosContainer.ondragstart = dragNdrop(TodosContainer, myTodoList, printTodoList);

  const clearCompleted = document.createElement('button');
  clearCompleted.classList.add('text-center', 'mx-auto', 'link-clear', 'list-group-item');
  clearCompleted.textContent = 'Clear all completed';
  todosNform.appendChild(clearCompleted);

  const enableClearButton = () => {
    let count = 0;
    TodosContainer.querySelectorAll('input').forEach((item) => {
      if (item.checked) {
        count += 1;
      }
    });
    if (count > 0) {
      clearCompleted.disabled = false;
    } else {
      clearCompleted.disabled = true;
    }
  };

  TodosContainer.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      enableClearButton();
    }
  });

  clearCompleted.addEventListener('click', () => {
    myTodoList.deleteCompleted();
    printTodoList();
  });

  enableClearButton();
};

printTodoList();
