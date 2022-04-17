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

    addTodo(title = "") {

        if (!this._todos.some(t => !t.title)) {
            this._todos = [...this._todos, { id: this.gentId(), title }]
            this._commit()
        }
    }

    deleteTodo(id) {
        this._todos = this._todos.filter(t => t.id != id)
        this._commit()
    }

    editTodo(id, title) {
        const todos = [...this._todos]
        if (title) {
            todos[this.getIndex(id)].title = title
            this._todos = todos
            this._commit()
        }
    }

    sortTodo(direction = true) {
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



class DOMManipulator {
    /**
     * Creates DOM manipulator instance.
     * @param {TodoService} service Todo manipulating service.
     */
    constructor(service) {
        this._service = service
        this._init()
        if (service instanceof TodoService) {
            console.log("no")
        }

    }
    _getElement(selector) {
        const element = document.querySelector(selector);

        if (element) {
            return element;
        }
    }

    _init() {

        const addBtn = this._getElement(".btn")
        const sortBtn = this._getElement(".to-do-sort")

        addBtn.addEventListener("click", e => {
            e.preventDefault()
            this._handleAdd()
        })
        this._displayTodos()

        sortBtn.addEventListener("click", e => this._handleSort())
    }
    _displayTodos() {
        const todoList = this._getElement(".items")
        const todos = this._service.getTodos()
        const items = todos.map(t => {
            const item = document.createElement("div")
            item.classList.add("item")
            const todoInput = document.createElement("input")
            todoInput.type = "text"
            todoInput.required = "salam"
            todoInput.addEventListener("change", e => this._handleEdit(t.id, e.target.value));
            const deleteBtnimg = document.createElement("img")
            deleteBtnimg.src = "img/Group 56.png"
            deleteBtnimg.addEventListener('click', e => {
                this._handleDelete(t.id)
            });
            item.append(todoInput)
            item.append(deleteBtnimg)
            todoInput.value = t.title

            return item
        })
        todoList.innerHTML = '';
        todoList.append(...items)
    }

    _handleAdd() {
        this._service.addTodo()
        this._displayTodos()

    }

    _handleEdit(id, title) {
        this._service.editTodo(id, title)
        this._displayTodos()
    }

    _handleDelete(id) {
        this._service.deleteTodo(id)
        this._displayTodos()
    }

    _handleSort() {
        this._service.sortTodo()
        this._displayTodos()
    }
}
const manipulator = new DOMManipulator(new TodoService([{ id: 1, title: "" }]));