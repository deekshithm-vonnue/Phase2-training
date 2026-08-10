import * as fs from "node:fs/promises";
import type { Task } from "./types/types.js";

const tasksFile = "tasks.json";
export async function readTasks(): Promise<Task[]> {
  try {
    const dataJSON = await fs.readFile(tasksFile, "utf8");
    return JSON.parse(dataJSON) as Task[];
  } catch (err) {
    return [];
  }
}

export const saveTasks = async (task: Task[]) => {
  try {
    const dataJSON = JSON.stringify(task, null, 2);
    await fs.writeFile(tasksFile, dataJSON);
  } catch (err) {
    console.error(err);
  }
};
