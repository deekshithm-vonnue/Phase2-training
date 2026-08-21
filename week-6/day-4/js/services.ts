import { readTasks, saveTasks } from "./storage.ts";
import type { Task } from "../types/types.ts";

export async function addTask(title: string): Promise<void> {
  const tasks: Task[] = await readTasks();
  const newTask: Task = {
    id: tasks.length + 1,
    title: title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task ${title} added succesfully`);
}

export async function deleteTask(id: number): Promise<void> {
  const tasks: Task[] = await readTasks();
  const updateTasks = tasks.filter((task) => task.id !== id);
  if (updateTasks.length === tasks.length) {
    throw new Error("Task not found");
  }
  saveTasks(updateTasks);
  console.log(`Task ${id} deleted successfully`);
}

export async function completeTask(id: number) {
  const tasks: Task[] = await readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error(`Task not found`);
  } else if (task.completed === true) {
    console.log(`Task is already marked completed`);
    return;
  }
  task.completed = true;
  saveTasks(tasks);
  console.log(`Task ${id} marked as completed`);
}

export async function filterTask(filter: string): Promise<void> {
  const tasks: Task[] = await readTasks();
  let filterTask: Task[] = [];

  if (filter === "completed") {
    filterTask = tasks.filter((task) => task.completed);
  } else if (filter == "pending") {
    filterTask = tasks.filter((task) => !task.completed);
  } else {
    console.log("Invalid filter operation");
    return;
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

export async function getTaskbyId(id: number) {
  const tasks = await readTasks();
  return tasks.find((task) => task.id === id);
}

export async function updateTask(id: number, change: Partial<Task>) {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    const updatedtask = { ...task, ...change };
    const index = tasks.indexOf(task);
    tasks[index] = updatedtask;
    saveTasks(tasks);
  } else {
    throw new Error("Task not found");
  }
}
