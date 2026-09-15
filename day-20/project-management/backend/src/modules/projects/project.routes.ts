import { Router } from "express";
import { projectController } from "./project.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const projectRoutes = Router();

projectRoutes.use(requireAuth);

projectRoutes.get("/", (req, res, next) => {
  projectController.list(req, res).catch(next);
});
