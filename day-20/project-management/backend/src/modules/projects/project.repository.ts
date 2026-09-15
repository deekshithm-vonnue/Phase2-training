import { prisma } from "../../db/primsa";

export class ProjectRepository {
  async list(_input: any) {
    return await prisma.project.findMany({});
  }
}
