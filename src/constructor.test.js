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
});