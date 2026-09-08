import { prisma } from "../../db/primsa";

export class issueRepository {
  async list(_input: any) {
    return await prisma.issue.findMany({});
  }
}
