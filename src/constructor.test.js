import localStorage from './LocalStorageMock.js';
import myTodoList, { Todo } from './constructor.js';

describe('Testing constructor class functions', () => {
  localStorage.clear();

  test('If there is no local Storage constructor will load default info', () => {
    expect(myTodoList.list).toEqual([new Todo(1, false, 'Click on the text to edit'),
      new Todo(2, false, 'Drag \'n drop to reorder your list'),
      new Todo(3, false, 'Manage all your lists in one place'),
      new Todo(4, false, 'Resync to clear out the old')]);
  });

  test('Add new Todo objects to local Storage', () => {
    myTodoList.list = [];
    myTodoList.new('Task 1');
    myTodoList.new('Task 2');
    expect(myTodoList.list).toEqual([new Todo(1, false, 'Task 1'),
      new Todo(2, false, 'Task 2')]);
  });

  test('Get highest index in Todo list', () => {
    expect(myTodoList.indexControl()).toBe(3);
  });

  test('Delete the Todo at a given index', () => {
    myTodoList.delete(2);
    expect(myTodoList.list).toEqual([new Todo(1, false, 'Task 1')]);
  });

  test('Swap the position of two Todos in the list', () => {
    myTodoList.new('Task 2');
    myTodoList.swap(1, 2);
    expect(myTodoList.list).toEqual([new Todo(2, false, 'Task 2'),
      new Todo(1, false, 'Task 1')]);
  });

  test('Save function user localstorage to save the information', () => {
    expect(myTodoList.list).toEqual(JSON.parse(localStorage.getItem('TodoList')));
  });

  test('Updates the completed property to true or false using index', () => {
    myTodoList.completed(1, true);
    expect(myTodoList.list[1].completed).toBe(true);
  });

  test('Updates the description property using index', () => {
    myTodoList.edit(1, 'Edited Todo');
    expect(myTodoList.list[1].description).toBe('Edited Todo');
  });

  test('Delete all Todo were compelted is true', () => {
    myTodoList.new('Task 3');
    myTodoList.new('Task 4');
    myTodoList.new('Task 5');
    myTodoList.completed(3, true);
    myTodoList.completed(4, true);
    myTodoList.completed(5, true);
    myTodoList.deleteCompleted();
    expect(myTodoList.list).toEqual([new Todo(2, false, 'Task 2')]);
  });
});