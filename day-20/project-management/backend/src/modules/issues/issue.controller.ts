import type { Request, Response } from "express";
import { IssueService } from "./issue.services";
import type { IssueIdparams } from "./issue.schema";

const issueService = new IssueService();
export class IssueController {
  async list(request: Request, response: Response) {
    const result = await issueService.list(request.query);
    response.json({ data: result });
  }

  async getById(request: Request, response: Response) {
    const result = await issueService.getById(request.params as IssueIdparams);
    response.json({ data: result });
  }
}

export const issueController = new IssueController();
