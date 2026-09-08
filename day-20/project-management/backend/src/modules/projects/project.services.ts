import { ProjectRepository } from "./project.repository";

const repository = new ProjectRepository();
export class ProjectService {
  async list(input: any) {
    const list = await repository.list(input);
    return list;
  }
}
