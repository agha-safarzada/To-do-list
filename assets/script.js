const TODOS = "TODOS"
class TodoService {
    _todos;
    constructor(todos = []) {
        this._init()
        if (!this._todos.length) {
            this._todos = todos
        }
        this._commit()
    }
    getTodos() {
        return [...this._todos]
    }

    gentId() {
        if (this._todos.length != 0) {
            return this._todos.sort((a, b) => (b.id - a.id))[0].id + 1;
        } else if (this._todos.length == 0) {
            return 1;
        }
    }

    getIndex(id) {
        const index = this._todos.findIndex(t => t.id === id)
        if (index != -1) {
            return index
        }
    }

    addTodo(title) {
        this._todos = [...this._todos, { id: this.gentId(), title }]
        this._commit()
    }

    deleteTodo(id) {
        this._todos = this._todos.filter(t => t.id != id)
        this._commit()
    }

    editTodo(id, title) {
        const todos = [...this._todos]
        todos[this.getIndex(id)].title = title
        this._todos = todos
        this._commit()
    }

    sortTodo() {
        const todos = [...this._todos].filter(t => t.title).sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            } else {
                return -1
            }
        })
        this._todos = todos
        this._commit()

    }

    _commit() {
        localStorage.setItem(TODOS, JSON.stringify(this._todos))
    }

    _init() {
        this._todos = JSON.parse(localStorage.getItem(TODOS) || "[]")
    }



}
TodoService1 = new TodoService([{ id: 1, title: "Elxan" }, { id: 3, title: "Elxan3" }, { id: 2, title: "Elxan2" }])
console.log(TodoService1.getTodos())
TodoService1.sortTodo();
TodoService1.editTodo(1, "asasaa");
TodoService1.getTodos();
TodoService1.getIndex(2);