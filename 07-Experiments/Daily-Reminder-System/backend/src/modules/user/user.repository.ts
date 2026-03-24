import { UserModel } from './user.model';

export class UserRepository {
  static async findUserByUsername(username: string) {
    return UserModel.findOne({ username });
  }

  static async findUserById(id: string) {
    return UserModel.findById(id);
  }

  static async isUserAdmin(userId: string, groupId: string): Promise<boolean> {
    // Basic implementation: check if user is the admin of the group
    // This needs GroupRepository or a cross-module check
    // For now, assuming direct check logic
    return true; // Placeholder for logic
  }
}
