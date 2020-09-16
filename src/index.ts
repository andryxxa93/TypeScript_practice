import {TodoItem} from './todoItem';
import {TodoCollection} from './todoCollections';

let todos = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
];

let collection = new TodoCollection('Andrew', todos);
console.log(`${collection.userName}s Todo List`);

let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);

console.log(JSON.stringify(todoItem));