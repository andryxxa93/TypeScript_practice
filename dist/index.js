"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollections_1 = require("./todoCollections");
const inquirer = require("inquirer");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"), new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"), new todoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new todoCollections_1.TodoCollection('Andrew', todos);
let showComplete = true;
function displayTodosList() {
    console.log(`${collection.userName}s Todo List` +
        `(${collection.getItemCounts().incomplete} item to do)`);
    collection.getTodoItems(showComplete).forEach(item => item.printDetails());
}
// collection.deleteCompleteItem();
// let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem = collection.getTodoById(newId);
// todoItem.printDetails();
// collection.addTodo(todoItem);
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Task";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() { console.clear(); inquirer.prompt({ type: "input", name: "add", message: "Enter task:" }).then(answers => { if (answers["add"] !== "") {
    collection.addTodo(answers["add"]);
} promptUser(); }); }
function promptComplete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showComplete).map(item => ({ name: item.task, value: item.id, checked: item.complete }))
    }).then(answers => {
        let completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodosList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
    }).then(answers => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showComplete = !showComplete;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.deleteCompleteItem();
                promptUser();
                break;
        }
    })
        .catch(err => {
        throw new Error(err);
    });
}
promptUser();
