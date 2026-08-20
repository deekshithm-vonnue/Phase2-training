import { Router } from "express";

import {
  assigneeHandler,
  createTicket,
  getAllTickets,
  getTicket,
  removeTicket,
  updateStatusHandler,
} from "./controller.ts";
import { getTicketsFilter } from "./services.ts";
import {validateTicketQuery} from "./middleware/ticketQuery.ts";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
// router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicket);
router.delete("/tickets/:id", removeTicket);
router.post("/tickets/create", createTicket);
router.post("/tickets/assignee/:id", assigneeHandler);
router.patch("/tickets/status/:id", updateStatusHandler);
router.get("/tickets", validateTicketQuery, getTicketsFilter);

// router.post("/category/create",createCategory);
// router.post("/user/create","createNewUser");
export default router;
