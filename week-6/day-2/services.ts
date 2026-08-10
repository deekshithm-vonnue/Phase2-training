import { readTasks, saveTasks } from "./storage.js";
import type { Task } from "./types/types.js";

export async function addTask(description: string): Promise<void> {
  const tasks: Task[] = await readTasks();
  const newTask: Task = {
    id: tasks.length + 1,
    description: description,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task ${description} added succesfully`);
}

export async function deleteTask(id: number): Promise<void> {
  const tasks: Task[] = await readTasks();
  const updateTasks = tasks.filter((task) => task.id !== id);
  if (updateTasks.length === tasks.length) {
    console.log("Task not found");
    return;
  }
  saveTasks(updateTasks);
  console.log(`Task {id} deleted successfully`);
}

export async function completeTask(id: number) {
  const tasks: Task[] = await readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log(`Task not found`);
    return;
  } else if (task.completed === true) {
    console.log(`Task is already marked completed`);
  }
  task.completed = true;
  saveTasks(tasks);
  console.log(`Task ${id} marked as completed`);
}

export async function filter(filter: string): Promise<void> {
  const tasks: Task[] = await readTasks();
  let filterTask: Task[] = [];

  if (filter === "completed") {
    filterTask = tasks.filter((task) => task.completed);
  } else if (filter == "pending") {
    filterTask = tasks.filter((task) => !task.completed);
  } else {
    console.log("Invaild filter operation");
  }
  filterTask.forEach((task) => {
    console.log(task);
  });
}

export async function list(): Promise<void> {
  const tasks: Task[] = await readTasks();
  tasks.forEach((task) => {
    console.log(task);
  });
}
