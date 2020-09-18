import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollections';
import * as inquirer from 'inquirer';

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
];

let collection: TodoCollection = new TodoCollection('Andrew', todos);
let showComplete = true;

function displayTodosList(): void {
    console.log(`${collection.userName}s Todo List` +
        `(${collection.getItemCounts().incomplete} item to do)`);
    collection.getTodoItems(showComplete).forEach(item => item.printDetails());
}

// collection.deleteCompleteItem();

// let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem = collection.getTodoById(newId);

// todoItem.printDetails();

// collection.addTodo(todoItem);

enum Commands {
    Add = 'Add new Task',
    Complete = 'Complete Task',
    Toggle = "Show/Hide Completed",
    Purge = "Remove Completed Task",
    Quit = "Quit"
}

function promptAdd(): void { console.clear(); inquirer.prompt({ type: "input", name: "add", message: "Enter task:" }).then(answers => { if (answers["add"] !== "") { collection.addTodo(answers["add"]); } promptUser(); }) }

function promptComplete(): void {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showComplete).map(item => ({ name: item.task, value: item.id, checked: item.complete }))
    }).then(answers => {
        let completedTasks = answers["complete"] as number[];
        collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined)); promptUser();
    })
}

function promptUser(): void {
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
                } else {
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
            throw new Error(err)
        })
}

promptUser();