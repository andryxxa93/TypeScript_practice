"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
            this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        }
        this.todoItems.push(new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id) {
        return this.itemMap.get(id);
    }
    getTodoItems(includeComplete) {
        // console.log(this.itemMap);
        console.log([...this.itemMap.values()]);
        return [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete);
    }
    deleteCompleteItem() {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        });
    }
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
}
exports.TodoCollection = TodoCollection;
