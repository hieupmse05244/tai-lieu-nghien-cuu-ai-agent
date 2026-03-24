"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("./user.model");
class UserRepository {
    static async findUserByUsername(username) {
        return user_model_1.UserModel.findOne({ username });
    }
    static async findUserById(id) {
        return user_model_1.UserModel.findById(id);
    }
    static async isUserAdmin(userId, groupId) {
        // Basic implementation: check if user is the admin of the group
        // This needs GroupRepository or a cross-module check
        // For now, assuming direct check logic
        return true; // Placeholder for logic
    }
}
exports.UserRepository = UserRepository;
