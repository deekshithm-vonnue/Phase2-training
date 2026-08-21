import { Router } from "express";

import {
  createTicket,
  getAllTickets,
  getTicket,
  removeTicket,
  update,
} from "./controller.ts";
const router = Router();

router.get("/", getAllTickets);
router.get("/:id", getTicket);
router.delete("/:id", removeTicket);
router.post("/", createTicket);
router.patch("/:id", update);
export default router;
