import { Router } from "express";

import {
  assigneeHandler,
  createTicket,
  getAllTickets,
  getTicket,
  removeTicket,
  updateStatusHandler,
} from "./controller.ts";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicket);
router.delete("/tickets/:id", removeTicket);
router.post("/tickets/create", createTicket);
router.patch("/tickets/assignee/:id", assigneeHandler);
router.patch("/tickets/status/:id", updateStatusHandler);


// router.post("/category/create",createCategory);
// router.post("/user/create","createNewUser");
export default router;
