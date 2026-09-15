import { issueRepository } from "./issue.repository";
import type { IssueIdparams } from "./issue.schema";

const repository = new issueRepository();
export class IssueService {
  async list(input: any) {
    const list = await repository.list(input);
    return list;
  }

  async getById(input: IssueIdparams){
    const issue = await repository.getById(input.id);
    return issue
  }
}
