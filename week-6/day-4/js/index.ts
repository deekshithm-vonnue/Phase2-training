import {
  addTask,
  completeTask,
  deleteTask,
  filterTask,
  list,
} from "./services.ts";

let operation = process.argv[2]?.toLowerCase();

switch (operation) {
  case "add":
    if (!process.argv[3]) {
      throw new Error("Need title for the task");
    }
    addTask(process.argv[3] as string);
    break;
  case "delete":
    if (!process.argv[3]) {
      throw new Error("Provide the id of the task which has to be deleted");
    }
    deleteTask(Number(process.argv[3]));
    break;
  case "list":
    list();
    break;
  case "completed":
    if (!process.argv[3]) {
      throw new Error("Provide the id of the task which has to be completed");
    }
    completeTask(Number(process.argv[3]));
    break;
  case "filter":
    if (!process.argv[3]) {
      throw new Error("Provide the filter operation- completed or pending");
    }
    filterTask(process.argv[3] as string);
    break;
  default:
    throw new Error("Invalid operation");
}
