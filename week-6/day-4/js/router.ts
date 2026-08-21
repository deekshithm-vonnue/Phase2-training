import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  removeTask,
  update,
} from "./controller.ts";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.patch("/:id", update);
router.delete("/:id", removeTask);

export default router;
