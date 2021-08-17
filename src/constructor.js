function Todo(index, completed, description) {
    this.index = index;
    this.completed = completed;
    this.description = description;
}

function TodoList() {
    this.list = [];
    this.new = (completed, description) => {
        this.list.push(new Todo(this.list.length + 1, completed, description))
    };
    this.delete = (value) =>{
        let index = this.list.indexOf(value);
        this.list.splice(index, 1);
    };
}

const myTodoList = new TodoList();

export default myTodoList;
