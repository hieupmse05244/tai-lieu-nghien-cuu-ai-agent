// Define DTOs for request and response
type CreateGroupDTO = {
  name: string;
  description: string;
  adminId: string;
};

type LinkTelegramDTO = {
  groupId: string;
  telegramChatId: string;
  userId: string;
};

export { CreateGroupDTO, LinkTelegramDTO };
