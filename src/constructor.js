function Todo(index, completed, description) {
  this.index = index;
  this.completed = completed;
  this.description = description;
}

function TodoList() {
  this.list = [];
  this.new = (completed, description) => {
    this.list.push(new Todo(this.list.length + 1, completed, description));
  };
  this.delete = (indexInput) => {
    const index = this.list.findIndex((item) => item.index === parseInt(indexInput, 10));
    this.list.splice(index, 1);
  };
  this.swap = (indexa, indexb) => {
    const x = this.list.findIndex((item) => item.index === parseInt(indexa, 10));
    const y = this.list.findIndex((item) => item.index === parseInt(indexb, 10));
    const des = this.list[x].description;
    const comp = this.list[x].completed;
    this.list[x].completed = this.list[y].completed;
    this.list[x].description = this.list[y].description;
    this.list[y].completed = comp;
    this.list[y].description = des;
  };
}

const myTodoList = new TodoList();

export default myTodoList;
