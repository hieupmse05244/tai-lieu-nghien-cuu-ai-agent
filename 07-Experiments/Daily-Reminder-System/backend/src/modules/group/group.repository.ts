import { Group, GroupDocument } from './group.model';

export class GroupRepository {
  async create(groupData: any): Promise<GroupDocument> {
    const group = new Group(groupData);
    return group.save();
  }

  async findById(id: string): Promise<GroupDocument | null> {
    return Group.findById(id);
  }

  async findGroupById(id: string): Promise<GroupDocument | null> {
    return this.findById(id);
  }
}
