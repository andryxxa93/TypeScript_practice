import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollections";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
    task: {id: number; task: string; complete: boolean;}[]
};

export class JsonTodoCollection extends TodoCollection {
    private database: lowdb.LowdbSync<schemaType>;

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        super(userName, []);
    }
}