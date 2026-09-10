import { prisma } from "../../db/primsa";

export class issueRepository {
  async list(_input: any) {
    return await prisma.issue.findMany({});
  }

  async getById(id: string) {
    return await prisma.issue.findUnique({
      where: {
        id: id,
      },
    });
  }
}
