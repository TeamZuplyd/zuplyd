import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IssueActionDto } from './dto/issue-action.dto';
import { IssueClass, IssueDocument } from './schemas/issue.schema';

@Injectable()
export class IssuesService {
  constructor(@InjectModel(IssueClass.name) private issueModel: Model<IssueDocument>) {}

  // raise (create) an issue (by SM, WM)
  async createIssue(createIssueDto: IssueActionDto): Promise<IssueClass> {
    let raisedIssue = null;
    raisedIssue = await this.issueModel.create(createIssueDto);
    return raisedIssue;
  }

  //update the issue record (by PM)
  async updateIssue(id: string, createIssueDto: IssueActionDto): Promise<IssueClass> {
    let raisedIssue = null;
    raisedIssue = await this.issueModel.findByIdAndUpdate(id, createIssueDto);

    return raisedIssue;
  }

  // find all issues
  async findAllsolved(id: string): Promise<IssueClass[]> {
    return this.issueModel.find({ flag: 1 }).exec();
  }

  async findAllunsolved(id: string): Promise<IssueClass[]> {
    return this.issueModel.find({ flag: 0 }).exec();
  }

  // find all issues for a users
  async findUserIssues(comp_id: string, user_id: string): Promise<IssueClass[]> {
    return this.issueModel.find({ company_id: comp_id, user_id: user_id }).exec();
  }
}
