import {TodoItem} from './todoItem';
import {TodoCollection} from './todoCollections';

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
];

let collection: TodoCollection = new TodoCollection('Andrew', todos);
console.log(`${collection.userName}s Todo List` + 
`(${collection.getItemCounts().incomplete} item to do)`);

collection.deleteCompleteItem();
collection.getTodoItems(true).forEach(item => item.printDetails());

let newId: number = collection.addTodo("Go for run");
let todoItem: TodoItem = collection.getTodoById(newId);

todoItem.printDetails();

// collection.addTodo(todoItem);
