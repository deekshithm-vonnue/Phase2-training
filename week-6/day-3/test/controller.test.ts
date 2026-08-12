import request from "supertest";
import {} from "../js/controller";
import { readTasks, saveTasks } from "../js/storage";
import { Task } from "../types/types";

jest.mock("../js/storage.ts", () => ({
  readTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

describe("getAlltask validation", () => {
  const mockReadTasks = readTasks as jest.Mock;
  const mockSaveTasks = saveTasks as jest.Mock;
  let intitialState: Task[];
  beforeEach(() => {
    intitialState = [
      { id: 1, title: "create login page", completed: false },
      { id: 2, title: "Implement Task Manger", completed: true },
    ];
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return statusCode 200 when getAlltask is ok", () => {
    mockReadTasks.mockResolvedValue(intitialState);
    
  });
});
