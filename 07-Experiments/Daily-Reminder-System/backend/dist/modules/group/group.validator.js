"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateGroup = validateCreateGroup;
exports.validateLinkTelegram = validateLinkTelegram;
// Import Zod for validation
const zod_1 = require("zod");
const createGroupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Group name is required"),
    description: zod_1.z.string().min(1, "Description is required")
});
const linkTelegramSchema = zod_1.z.object({
    telegramChatId: zod_1.z.string().min(1, "Telegram Chat ID is required")
});
function validateCreateGroup(data) {
    return createGroupSchema.parse(data);
}
function validateLinkTelegram(data) {
    return linkTelegramSchema.parse(data);
}
