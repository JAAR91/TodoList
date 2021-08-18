function Todo(index, completed, description) {
  this.index = index;
  this.completed = completed;
  this.description = description;
}

class TodoList {

  constructor() {
    this.list = JSON.parse(localStorage.getItem('TodoList')) || [];
  }
  
  new(completed, description){
    this.list.push(new Todo(this.list.length + 1, completed, description));
    this.save();
  }

  delete(indexInput) {
    const index = this.list.findIndex((item) => item.index === parseInt(indexInput, 10));
    this.list.splice(index, 1);
    this.save();
  }

  swap(indexa, indexb) {
    let x = this.list.findIndex((item) => item.index === parseInt(indexa, 10));
    let y = this.list.findIndex((item) => item.index === parseInt(indexb, 10));
    let todo1 = this.list[x];
    this.list[x] = this.list[y];
    this.list[y] = todo1;
    this.save();
  }

  save() {
    localStorage.setItem('TodoList', JSON.stringify(this.list));
  }

  completed(index, value){
    this.list.find((item) => item.index === parseInt(index, 10)).completed = value;
    this.save();
  }
}

const myTodoList = new TodoList();

export default myTodoList;
