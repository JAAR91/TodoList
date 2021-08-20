function Todo(index, completed, description) {
  this.index = index;
  this.completed = completed;
  this.description = description;
}

class TodoList {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('TodoList')) || [new Todo(1, false, 'Click on the text to edit'),
      new Todo(2, false, 'Drag \'n drop to reorder your list'),
      new Todo(3, false, 'Manage all your lists in one place'),
      new Todo(4, false, 'Resync to clear out the old')];
  }

  new(description) {
    this.list.push(new Todo(this.indexControl(), false, description));
    this.save();
  }

  indexControl() {
    return this.list.reduce((prev, current) => (
      (prev.index > current.index) ? prev : current), 1).index + 1 || 1;
  }

  delete(indexInput) {
    const index = this.list.findIndex((item) => item.index === parseInt(indexInput, 10));
    this.list.splice(index, 1);
    this.save();
  }

  swap(indexa, indexb) {
    const x = this.list.findIndex((item) => item.index === parseInt(indexa, 10));
    const y = this.list.findIndex((item) => item.index === parseInt(indexb, 10));
    const todo1 = this.list[x];
    this.list[x] = this.list[y];
    this.list[y] = todo1;
    this.save();
  }

  save() {
    localStorage.setItem('TodoList', JSON.stringify(this.list));
  }

  completed(index, value) {
    this.list.find((item) => item.index === parseInt(index, 10)).completed = value;
    this.save();
  }

  deleteCompleted() {
    this.list.filter((item) => item.completed).forEach((element) => {
      this.delete(element.index);
    });
  }

  edit(index, description) {
    this.list.find((item) => item.index === parseInt(index, 10)).description = description;
    this.save();
  }
}

const myTodoList = new TodoList();

export default myTodoList;
