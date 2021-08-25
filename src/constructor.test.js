import localStorage from './LocalStorageMock.js';
import myTodoList,{Todo} from './constructor.js';

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
});