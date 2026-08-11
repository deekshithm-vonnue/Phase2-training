import { title } from "node:process";
import {
  addTask,
  completeTask,
  deleteTask,
  filterTask,
  list,
} from "../js/services";
import { readTasks, saveTasks } from "../js/storage";
import { Task } from "../types/types";
import { after } from "node:test";

jest.mock("../js/storage.js", () => ({
  readTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

describe("add task", () => {
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should return a actual arraylength plus 1 when addTask is called", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
    ];
    const intialLength = intialTasks.length;
    mockReadTasks.mockResolvedValue(intialTasks);
    await addTask("implement task manger");
    expect(mockSaveTasks).toHaveBeenCalledTimes(1);

    const savedArray = mockSaveTasks.mock.calls[0][0];

    expect(savedArray).toHaveLength(intialLength + 1);
  });
});

describe("delete task", () => {
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a actual arraylength minus 1 when deleteTask is called with id in the tasks array", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
    ];
    const intialLength = intialTasks.length;
    mockReadTasks.mockResolvedValue(intialTasks);
    await deleteTask(1);
    expect(mockSaveTasks).toHaveBeenCalledTimes(1);
    const savedArray = mockSaveTasks.mock.calls[0][0];
    expect(savedArray).toHaveLength(intialLength - 1);
  });

  test("should throw error when deleteTask is called with id which is not in the tasks array", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);
    await expect(() => deleteTask(2)).rejects.toThrow(/found/i);
  });
});

describe("complete task validation", () => {
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return error when completeTask is called with id which is not in the tasks array", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);
    await expect(() => completeTask(2)).rejects.toThrow(/found/i);
  });

  test("should a task with complete key with truw when completeTask is called with id which is int the tasks array", async () => {
    const intialTasks = [
      { id: 1, title: "creat login page", completed: false },
    ];
    const id = 1;

    mockReadTasks.mockResolvedValue(intialTasks);
    await completeTask(id);
    expect(mockSaveTasks).toHaveBeenCalledTimes(1);

    const updatedTask = mockSaveTasks.mock.calls[0][0] as Task[];
    const task = updatedTask.find((t) => t.id === id);
    expect(task?.completed).toBe(true);
  });
});

describe("list operation validation", () => {
  let logSpy: jest.SpyInstance;
  const mockReadTasks = readTasks as jest.Mock;
  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should console each task when list operation is called", async () => {
    const intialTasks = [
      { id: 1, title: "creat login page", completed: false },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);

    await list();
    expect(logSpy).toHaveBeenCalledWith(intialTasks[0]);
  });
});

describe("filterTask validation", () => {
  let logSpy: jest.SpyInstance;
  const mockReadTasks = readTasks as jest.Mock;
  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should return invalid operation when filterTask is called with invalid operation", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);

    await filterTask("paused");
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("Invalid filter operation");
  });

  test("should return task with completed when filterTask is called with parameter `completed`", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);
    await filterTask("completed");
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(intialTasks[1]);
  });

  test("should return task with pending when filterTask is called with parameter `pending`", async () => {
    const intialTasks = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];
    mockReadTasks.mockResolvedValue(intialTasks);
    await filterTask("pending");
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(intialTasks[0]);
  });
});
