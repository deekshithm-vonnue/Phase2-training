import type { Request, Response } from "express";
import { ProjectService } from "./project.services";

const projectService = new ProjectService();
export class ProjectController {
  async list(request: Request, response: Response) {
    const result = await projectService.list(request.query);
    response.json({ data: result });
  }
}

export const projectController = new ProjectController();
