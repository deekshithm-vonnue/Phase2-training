import request from "supertest";
import { Ticket } from "../js/types/type";
import {
  deleteTicket,
  getTicketById,
  addTicket,
  validateTicket,

} from "../js/services";
import { AppError } from "../js/types/appError";
jest.mock("../js/storage", () => ({
  readTickets: jest.fn(),
  saveTicket: jest.fn(),
}));


describe("Get endpoint validation", () => {

  let initialState: Ticket[];
  beforeEach(() => {
    initialState = [
      {
        title: "create login page",
        description: "implementation login page",
        priority: "high",
        status: "closed",
        categoryId: 1,
        customerId:1,
      },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200 ok when getAllTickets is called", async () => {
    mockreadTickets.mockResolvedValue(initialState);
    const res = await request(app).get("/tickets");
    expect(mockreadTickets).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual(initialState);
  });

  test("should return empty array when getAllTickets is called but no json file", async () => {
    mockreadTickets.mockResolvedValue([]);
    const res = await request(app).get("/tickets");

    expect(mockreadTickets).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("should return 200 ok when getTicket is called with a ID in the database", async () => {
    const mockData = {
      title: "create login page",
      description: "implementation login page",
      priority: "high",
      status: "closed",
      assignee: "none",
      id: "1",
    };
    mockGetTicket.mockResolvedValue(mockData);

    const res = await request(app).get("/tickets/1");

    expect(mockGetTicket).toHaveBeenCalledWith("1");
    expect(mockGetTicket).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test("should return 400 bad request when getTicket is called with ID invalid", async () => {
    mockGetTicket.mockResolvedValue(null);

    const res = await request(app).get("/tickets/2");

    expect(mockGetTicket).toHaveBeenCalled();
    expect(res.status).toBe(400);
    expect(res.text).toEqual("Task not found");
  });
});

describe("DELETE endpoint", () => {
  const mockDeleteTicket = deleteTicket as jest.Mock;
  let mockState: Ticket[];
  beforeEach(() => {
    mockState = [
      {
        title: "create login page",
        description: "implementation login page",
        priority: "high",
        status: "closed",
        assignee: "none",
        id: "1",
      },
      {
        title: "create login page",
        description: "implementation login page",
        priority: "high",
        status: "closed",
        assignee: "none",
        id: "2",
      },
    ];
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200 ok when Ticket got deleted", async () => {
    mockDeleteTicket.mockResolvedValue(undefined);
    const res = await request(app).delete("/tickets/1");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/delete/i);
  });

  test("should return 400 bad request when Ticket is failed to deleted", async () => {
    mockDeleteTicket.mockRejectedValue(new AppError("Deletion failed", 400));
    const res = await request(app).delete("/tickets/2");

    expect(res.status).toBe(400);
    expect(res.text).toMatch(/fail/i);
  });
});

describe("POST endpoint", () => {
  const mockValidateTicket = validateTicket as jest.Mock;
  const mockAddTicket = addTicket as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200ok when new ticket got created", async () => {
    mockValidateTicket.mockReturnValue(undefined);
    mockAddTicket.mockResolvedValue(undefined);

    const res = await request(app)
      .post("/tickets")
      .send({
        title: "create login page",
        description: "implementation login page",
        priority: "high",
        status: "closed",
        assignee: "none",
      })
      .set("content-type", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.text).toMatch("Task created successfully");
  });

  test("should return 401 bad request when new ticket is missing the title field", async () => {
    mockValidateTicket.mockImplementation(() => {
      throw new AppError("Title field is missing", 401);
    });

    const res = await request(app)
      .post("/tickets")
      .send({
        description: "implementation login page",
        priority: "high",
        status: "closed",
        assignee: "none",
      })
      .set("content-type", "application/json");

    expect(mockValidateTicket).toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch("Title field is missing");
  });
});

describe("PATCH endpoint", () => {
  const mockUpdate = updateAssigneeOrStatusOrBoth as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200 ok when update is called", async () => {
    mockUpdate.mockResolvedValue(undefined);
    const res = await request(app)
      .patch("/tickets/:1")
      .send({
        status: "closed",
      })
      .set("content-type", "application/json");
    expect(res.statusCode).toBe(200);
  });
});
