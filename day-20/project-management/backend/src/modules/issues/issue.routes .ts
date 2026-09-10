import { Router } from "express";
import { issueController } from "./issue.controller";
import { validate } from "zod";
import { issueIdparams } from "./issue.schema";
import { validation } from "../../middleware/validation.middleware";

export const issueRoutes = Router();

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
