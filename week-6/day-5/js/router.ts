
import { Router } from "express";

import { getAllTickets } from "./controller.ts";
const router = Router();

router.get("/", getAllTickets);
router.delete("/:id",)
export default router;
