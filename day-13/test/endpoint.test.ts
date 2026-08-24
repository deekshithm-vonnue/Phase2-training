import request from "supertest";
import { Ticket } from "../js/types/type";
import { prisma } from "../lib/prisma";
import { priority } from "../generated/prisma/enums";
import app from "../js/app";

describe("Test enpoint", () => {
  let ticket: Ticket & { id: string };

  afterAll(async () => {
    await prisma.assignments.deleteMany({});
    await prisma.tickets.deleteMany({});
    await prisma.$disconnect();
  });

  test("POST /tickets/create -should successfully create a ticket", async () => {
    const response = await request(app).post("/tickets/create").send({
      title: "test data",
      priority: "high",
      status: "open",
      description: "new description",
      categoryId: 1,
      customerId: 1,
    });

    expect(response.status).toBe(201);
    ticket = response.body.newTicket;
    console.log(ticket);
  });

  test("POST /tickets/create - should fail when body has does not enough data", async () => {
    const response = await request(app).post("/tickets/create").send({
      title: "test data",
      priority: "high",
      description: "new description",
      categoryId: 1,
      customerId: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/missing/i);
  });

  test("GET /tickets/:id  - should successfully retrive ticket", async () => {
    const response = await request(app).get(`/tickets/${ticket.id}`);
    expect(response.status).toBe(200);
    console.log(response.body);
  });

  test("GET /tickets/:id - should fail when ticket is not found ", async () => {
    const response = await request(app).get(`/tickets/1`);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/not found/i);
  });

  test("GET /tickets -should successfully retrive ticket", async () => {
    const response = await request(app).get(`/tickets`);
    expect(response.status).toBe(200);
  });

  test("GET /tickets - should empty when status working is not in the tickets list", async () => {
    const response = await request(app)
      .get(`/tickets`)
      .query({ status: "working" });
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
  test("PATCH /tickets/status/:id - should successully update ticket", async () => {
    const reponse = await request(app)
      .patch(`/tickets/status/${ticket.id}`)
      .send({
        status: "close",
      });

    expect(reponse.status).toBe(200);
  });

  test("PATCH /tickets/status/:id - should successully update ticket", async () => {
    const reponse = await request(app).patch(`/tickets/status/1`).send({
      status: "close",
    });

    expect(reponse.status).toBe(404);
    expect(reponse.body.message).toMatch(/not found/i);
  });

  test("DELETE /ticket/:id - should successully delete ticket", async () => {
    const response = await request(app).delete(`/tickets/${ticket.id}`);
    expect(response.status).toBe(200);
  });

  test("DELETE /ticket/:id - should fail when ticket is not found", async () => {
    const response = await request(app).delete(`/tickets/1`);
    expect(response.status).toBe(400);
  });
});
