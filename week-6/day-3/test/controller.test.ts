import request from "supertest";
import {
  createTask,
  getAllTasks,
  getRequestJSON,
  getTask,
  removeTask,
  helpers,
  update,
} from "../js/controller";
import { readTasks, saveTasks } from "../js/storage";
import { Task } from "../types/types";
import { sendResponse } from "../js/responseHelper";
import { IncomingMessage, ServerResponse } from "node:http";
import { addTask, deleteTask, getTaskbyId, updateTask } from "../js/services";
import { create } from "node:domain";

jest.mock("../js/storage.ts", () => ({
  readTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

jest.mock("../js/responseHelper.ts");

jest.mock("../js/services", () => ({
  getTaskbyId: jest.fn(),
  deleteTask: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
}));

describe("getAlltask validation", () => {
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;
  let intitialState: Task[];
  let mockReq: Partial<IncomingMessage>, mockRes: Partial<ServerResponse>;
  beforeEach(() => {
    intitialState = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];

    mockReq = {};
    mockRes = {};
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return statusCode 200 when getAlltask is ok", async () => {
    mockReadTasks.mockResolvedValue(intitialState);

    //ACT
    await getAllTasks(mockReq as IncomingMessage, mockRes as ServerResponse);

    //ASSERT
    expect(mockReadTasks).toHaveBeenCalledTimes(1);
    expect(sendResponse.sucess).toHaveBeenCalledWith(
      mockRes,
      intitialState,
      200,
    );
    expect(sendResponse.error).not.toHaveBeenCalled();
  });

  test("should return 500 when readTasks trows an error", async () => {
    mockReadTasks.mockRejectedValue(new Error("Internal Server Error"));

    //ACT
    await getAllTasks(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(mockReadTasks).toHaveBeenCalledTimes(1);
    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Internal Server Error",
      500,
    );
    expect(sendResponse.sucess).not.toHaveBeenCalled();
  });
});

describe("getTaskById controller", () => {
  const mockGetTaskById = getTaskbyId as jest.Mock;
  let intitialState: Task[];
  let mockReq: Partial<IncomingMessage>, mockRes: Partial<ServerResponse>;
  beforeEach(() => {
    intitialState = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];

    mockReq = {};
    mockRes = {};
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if the ID is missing from the URL path pattern", async () => {
    mockReq = { url: "/tasks/632" };

    await getTask(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Task id is required",
      400,
    );
  });

  test("should return 404 if the task ID is valid but the record does not exits", async () => {
    mockReq = { url: "/tasks/:632" };
    mockGetTaskById.mockResolvedValue(null);

    await getTask(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(mockGetTaskById).toHaveBeenCalledTimes(1);
    expect(mockGetTaskById).toHaveBeenCalledWith(632);
    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Task not found",
      404,
    );
  });

  test("should return 200 if the task get retrived", async () => {
    mockReq = { url: "/tasks/:1" };
    const mockTask = { id: 1, title: "Finish unit testing", complete: false };
    mockGetTaskById.mockResolvedValue(mockTask);

    await getTask(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(getTaskbyId).toHaveBeenCalledWith(1);
    expect(sendResponse.sucess).toHaveBeenCalledWith(mockRes, mockTask, 200);
  });
});

describe("removeTask", () => {
  const mockDeleteTask = deleteTask as jest.Mock;
  let mockReq: Partial<IncomingMessage>, mockRes: Partial<ServerResponse>;
  let intitialState: Task[];

  beforeEach(() => {
    intitialState = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];
    mockReq = {};
    mockRes = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200 when deleteTask deletes with an id", async () => {
    mockReq = { url: "/tasks/:1" };
    const mockTask = { id: 1, title: "Finish unit testing", complete: false };
    mockDeleteTask.mockResolvedValue(mockTask);
    await removeTask(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(sendResponse.sucess).toHaveBeenCalledWith(
      mockRes,
      "Successfully deleted task",
      200,
    );
  });

  test("should return 400 when ID is missing", async () => {
    mockReq = { url: "/tasks/632" };

    await removeTask(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Task id is required",
      400,
    );
  });

  test("should return 404 when ID is not found", async () => {
    mockReq = { url: "/tasks/:34" };
    mockDeleteTask.mockRejectedValue(new Error("Task not found"));
    await removeTask(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Task not found",
      404,
    );
  });
});

describe("createTask", () => {
  const mockAddTask = addTask as jest.Mock;
  let mockReq: Partial<IncomingMessage>, mockRes: Partial<ServerResponse>;
  let spyGetRequestJSON: jest.SpyInstance;
  beforeEach(() => {
    mockReq = {};
    mockRes = {};
    spyGetRequestJSON = jest
      .spyOn(helpers, "getRequestJSON")
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("should reeturn 201 when task get created", async () => {
    mockReq = { method: "POST", url: "/tasks" };
    const body = { title: "create task manager" };

    spyGetRequestJSON.mockResolvedValue(body);

    await createTask(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(mockAddTask).toHaveBeenCalled();
    expect(sendResponse.sucess).toHaveBeenCalledTimes(1);
    expect(sendResponse.sucess).toHaveBeenCalledWith(
      mockRes,
      "Task added successfully",
      201,
    );
  });

  test("should return 500 when getRequestJSON gets rejected", async () => {
    mockReq = { method: "POST", url: "/tasks" };
    spyGetRequestJSON.mockRejectedValue(null);
    await createTask(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(sendResponse.error).toHaveBeenCalledTimes(1);
    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      "Internal Server Error",
      500,
    );
  });
});

describe("update", () => {
  const mockUpdate = updateTask as jest.Mock;
  let mockReq: Partial<IncomingMessage>, mockRes: Partial<ServerResponse>;
  let spyGetRequestJSON: jest.SpyInstance;
  beforeEach(() => {
    mockReq = {};
    mockRes = {};
    spyGetRequestJSON = jest
      .spyOn(helpers, "getRequestJSON")
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("should reeturn 201 when task get created", async () => {
    mockReq = { method: "PATCH", url: "/tasks/:1" };
    const body = { title: "create task manager" };

    spyGetRequestJSON.mockResolvedValue(body);

    await update(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(mockUpdate).toHaveBeenCalled();
    expect(sendResponse.sucess).toHaveBeenCalledTimes(1);
    expect(sendResponse.sucess).toHaveBeenCalledWith(
      mockRes,
      "Task updated successfully",
      200,
    );
    expect(sendResponse.error).not.toHaveBeenCalled();
  });

  test("should return 500 when getRequestJSON gets rejected", async () => {
    mockReq = { method: "PATCH", url: "/tasks/:1" };
    spyGetRequestJSON.mockRejectedValue(new Error("Body is Empty"));
    await update(mockReq as IncomingMessage, mockRes as ServerResponse);
    expect(sendResponse.error).toHaveBeenCalledTimes(1);
    expect(sendResponse.error).toHaveBeenCalledWith(
      mockRes,
      expect.any(Error),
      404,
    );
  });
});
