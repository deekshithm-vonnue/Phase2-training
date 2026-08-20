import http from "http";
import request from "supertest"; // Install via: npm install --save-dev supertest @types/supertest
import { taskRouter } from "./task.router";
import { getAllTasks, getTask } from "./task.controller";

// 1. Mock the controllers so we don't execute their inner database logic
jest.mock("./task.controller", () => ({
  getAllTasks: jest.fn((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "getAllTasks called" }));
  }),
  getTask: jest.fn((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "getTask called" }));
  }),
}));

describe("Task Router Integration Tests", () => {
  // let server: http.Server;

  beforeAll(() => {
    // 2. Create a temporary local server instance passing your router function
    server = http.createServer((req, res) => {
      taskRouter(req, res);
    });
  });

  afterAll((done) => {
    // 3. Clean up and close the server stream after tests finish
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should route GET /tasks to getAllTasks controller", async () => {
    const response = await request(server).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getAllTasks called" });
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it("should route GET /tasks/:id to getTask controller", async () => {
    const response = await request(server).get("/tasks/:42");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getTask called" });
    expect(getTask).toHaveBeenCalledTimes(1);
  });

  it("should return 404 for unhandled route matching patterns", async () => {
    const response = await request(server).post("/tasks"); // POST layout instead of GET

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Route not found" });
    expect(getAllTasks).not.toHaveBeenCalled();
    expect(getTask).not.toHaveBeenCalled();
  });
});
