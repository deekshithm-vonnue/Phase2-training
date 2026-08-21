// import url from 'url'
import { resolve } from "node:dns";
import { sendResponse } from "./responseHelper.ts";
import { addTask, deleteTask, getTaskbyId, updateTask } from "./services.ts";
import { readTasks } from "./storage.ts";
import { IncomingMessage, ServerResponse } from "node:http";
import type { Task } from "../types/types.ts";
// import { Task } from "../types/types.ts";
export async function getAllTasks(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const response = await readTasks();
    sendResponse.sucess(res, response, 200);
  } catch (error) {
    sendResponse.error(res, "Internal Server Error", 500);
  }
}

export async function createTask(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const data = await helpers.getRequestJSON(req);
    await addTask(data.title);
    sendResponse.sucess(res, "Task added successfully", 201);
  } catch (error) {
    sendResponse.error(res, "Internal Server Error", 500);
  }
}

export async function getTask(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const id = req.url?.split("/:")[1];
  if (!id) {
    sendResponse.error(res, "Task id is required", 400);
    return;
  }

  const task = await getTaskbyId(Number(id));
  if (!task) {
    sendResponse.error(res, "Task not found", 404);
    return;
  }
  sendResponse.sucess(res, task, 200);
}

export async function removeTask(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const id = req.url?.split("/:")[1];
  if (!id) {
    sendResponse.error(res, "Task id is required", 400);
    return;
  }
  try {
    await deleteTask(Number(id));
    sendResponse.sucess(res, "Successfully deleted task", 200);
  } catch (error: any) {
    sendResponse.error(res, error.message as string, 404);
  }
}

export async function update(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const id = req.url?.split("/:")[1];

  if (!id) {
    sendResponse.error(res, "Task id is required", 400);
    return;
  }

  try {
    const data = await helpers.getRequestJSON(req);
    await updateTask(Number(id), data);
    sendResponse.sucess(res, "Task updated successfully", 200);
  } catch (error) {
    sendResponse.error(res, error as string, 404);
  }
}

export async function getRequestJSON(req: IncomingMessage): Promise<Task> {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk.toString();
  });

  return new Promise((resolve) => {
    req.on("end", async function () {
      const data = JSON.parse(body);
      resolve(data);
    });
  });
}

export const helpers = { getRequestJSON };
