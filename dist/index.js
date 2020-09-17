"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollections_1 = require("./todoCollections");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"), new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"), new todoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new todoCollections_1.TodoCollection('Andrew', todos);
console.log(`${collection.userName}s Todo List` +
    `(${collection.getItemCounts().incomplete} item to do)`);
collection.deleteCompleteItem();
collection.getTodoItems(true).forEach(item => item.printDetails());
let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);
todoItem.printDetails();
// collection.addTodo(todoItem);
