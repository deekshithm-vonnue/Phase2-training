import { sendResponse } from "./responseHelper.ts";
import { addTask, deleteTask, getTaskbyId, updateTask } from "./services.ts";
import { readTasks } from "./storage.ts";
import type { Request, Response } from "express";

export async function getAllTasks(req: Request, res: Response): Promise<void> {
  try {
    const response = await readTasks();
    sendResponse.sucess(res, response, 200);
  } catch (error) {
    sendResponse.error(res, "Internal Server Error", 500);
  }
}

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    await addTask(req.body.title);
    sendResponse.sucess(res, "Task added successfully", 201);
  } catch (error) {
    sendResponse.error(res, "Internal Server Error", 500);
  }
}

export async function getTask(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
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

export async function removeTask(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  if (!id) {
    sendResponse.error(res, "Task id is required", 400);
    return;
  }
  try {
    const task = await deleteTask(Number(id));
    sendResponse.sucess(res, task, 200);
  } catch (error) {
    sendResponse.error(res, error as string, 404);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  if (!id) {
    sendResponse.error(res, "Task id is required", 400);
    return;
  }

  try {
    await updateTask(Number(id), req.body);
    sendResponse.sucess(res, "Task updated successfully", 200);
  } catch (error) {
    sendResponse.error(res, error as string, 404);
  }
}
