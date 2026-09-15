import { PRIORITIES, STATUSES, Ticket } from "../js/types/type";
import { validateTicket } from "../js/services";

(global as any).PRIORITIES = PRIORITIES;
(global as any).STATUSES = STATUSES;
describe("vaidate Ticket when creating endpoint", () => {
  const validTicket = {
    title: "Fix bug",
    description: "Fixing js bug",
    priority: "low",
    status: "open",
  };

  test("should pass withour error for a valid ticket", () => {
    expect(() => validateTicket(validTicket as any)).not.toThrow();
  });

  test("should throw error if title is missing", () => {
    const ticket = { ...validTicket, title: undefined };
    expect(() => validateTicket(ticket as any)).toThrow(
      "Title field is missing",
    );
  });
  test("should throw error if description is missing", () => {
    const ticket = { ...validTicket, description: undefined };
    expect(() => validateTicket(ticket as any)).toThrow(
      "description field is missing",
    );
  });

  test("should throw error if priority is missing or invalid", () => {
    let ticket = { ...validTicket, priority: undefined };
    expect(() => validateTicket(ticket as any)).toThrow(
      "priority field is missing",
    );
    const secondTicket = { ...validTicket, priority: 12 };
    expect(() => validateTicket(secondTicket as any)).toThrow(
      "priority field is missing",
    );
  });

  test("should throw error if status i missing or invalid", () => {
    let ticket = { ...validTicket, status: undefined };
    expect(() => validateTicket(ticket as any)).toThrow(
      "status field is missing",
    );
    const secondTicket = { ...validTicket, status: 12 };
    expect(() => validateTicket(secondTicket as any)).toThrow(
      "status field is missing",
    );
  });
});
