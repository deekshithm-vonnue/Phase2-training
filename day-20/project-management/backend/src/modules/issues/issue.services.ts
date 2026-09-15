import { issueRepository } from "./issue.repository";

const repository = new issueRepository();
export class IssueService {
  async list(input: any) {
    const list = await repository.list(input);
    return list;
  }
}
