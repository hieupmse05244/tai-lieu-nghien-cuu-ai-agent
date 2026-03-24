"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepository = void 0;
const telegraf_1 = require("telegraf");
const env_1 = require("../../config/env");
class MessageRepository {
    constructor() {
        this.bot = new telegraf_1.Telegraf(env_1.env.TELEGRAM_BOT_TOKEN);
    }
    async sendMessage(chatId, message) {
        try {
            await this.bot.telegram.sendMessage(chatId, message);
        }
        catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message');
        }
    }
}
exports.messageRepository = new MessageRepository();
