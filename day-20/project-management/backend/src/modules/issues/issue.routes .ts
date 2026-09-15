import { Router } from "express";
import { issueController } from "./issue.controller";
import { issueIdparams } from "./issue.schema";
import { validation } from "../../middleware/validation.middleware";
import { requireAuth } from "../../middleware/auth.middleware";

export const issueRoutes = Router();

issueRoutes.use(requireAuth)
issueRoutes.get("/", (req, res, next) => {
  issueController.list(req, res).catch(next);
});

issueRoutes.get(
  `/:id`,
  validation({ params: issueIdparams }),
  (req, res, next) => {
    issueController.getById(req, res).catch(next);
  },
);
