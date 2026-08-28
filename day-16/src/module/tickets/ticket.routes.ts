import { Router } from "express";

import {
  assigneeHandler,
  createTicket,
  getAllTickets,
  getTicket,
  getTicketsController,
  removeTicket,
  updateStatusHandler,
} from "./ticket.controller.ts";
import { validateTicketQuery } from "../../middleware/ticketQuery.ts";

const ticketRoutes = Router();

// router.get("/tickets", getAllTickets);
ticketRoutes.get("/tickets/:id", getTicket);
ticketRoutes.delete("/tickets/:id", removeTicket);
ticketRoutes.post("/tickets/create", createTicket);
ticketRoutes.post("/tickets/assignee/:id", assigneeHandler);
ticketRoutes.patch("/tickets/status/:id", updateStatusHandler);
ticketRoutes.get("/tickets", validateTicketQuery, getTicketsController);

// router.post("/category/create",createCategory);
// router.post("/user/create","createNewUser");
export default ticketRoutes;
