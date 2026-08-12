import request from "supertest";
import { getAllTasks, getTask } from "../js/controller";
import { readTasks, saveTasks } from "../js/storage";
import { Task } from "../types/types";
import { sendResponse } from "../js/responseHelper";
import { IncomingMessage, ServerResponse } from "node:http";
import { getTaskbyId } from "../js/services";

jest.mock("../js/storage.ts", () => ({
  readTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

jest.mock("../js/responseHelper.ts");

jest.mock("../js/services", () => ({
  getTaskbyId: jest.fn(),
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
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;
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
});
