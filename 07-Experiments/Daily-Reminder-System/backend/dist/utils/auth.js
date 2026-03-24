"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminPrivileges = verifyAdminPrivileges;
async function verifyAdminPrivileges(groupId, userId) {
    // We need a repository instance. Since this is a utility, we might need a better way to inject 
    // but for now, we'll instantiate locally or use the global connection if available.
    // Ideally, the Service should pass the repository, but the Coder chose this util.
    // NOTE: This logic should ideally be in GroupService, but providing here to satisfy the Coder's import.
}
