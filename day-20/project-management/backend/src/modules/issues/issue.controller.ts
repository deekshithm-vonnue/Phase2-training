import type { Request, Response } from "express";
import { IssueService } from "./issue.services";

const projectService = new IssueService();
export class IssueController {
  async list(request: Request, response: Response) {
    const result = await projectService.list(request.query);
    response.json({ data: result });
  }
}

export const issueController = new IssueController();
