// Import Zod for validation
import { z } from 'zod';

const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().min(1, "Description is required")
});

const linkTelegramSchema = z.object({
  telegramChatId: z.string().min(1, "Telegram Chat ID is required")
});

export function validateCreateGroup(data: any) {
  return createGroupSchema.parse(data);
}

export function validateLinkTelegram(data: any) {
  return linkTelegramSchema.parse(data);
}
