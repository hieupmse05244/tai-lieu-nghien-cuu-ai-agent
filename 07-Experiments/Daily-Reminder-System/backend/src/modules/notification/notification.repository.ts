import { Telegraf } from 'telegraf';
import { env } from '../../config/env';

class MessageRepository {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }
}

export const messageRepository = new MessageRepository();
