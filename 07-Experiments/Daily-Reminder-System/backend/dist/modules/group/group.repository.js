"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRepository = void 0;
const group_model_1 = require("./group.model");
class GroupRepository {
    async create(groupData) {
        const group = new group_model_1.Group(groupData);
        return group.save();
    }
    async findById(id) {
        return group_model_1.Group.findById(id);
    }
    async findGroupById(id) {
        return this.findById(id);
    }
}
exports.GroupRepository = GroupRepository;
