"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const mongoose_1 = __importDefault(require("mongoose"));
const telegraf_1 = require("telegraf");
const task_scheduler_1 = require("./modules/task/task.scheduler");
const bot_commands_1 = require("./bot.commands");
const PORT = parseInt(env_1.env.PORT, 10) || 3000;
// Initialize Telegram Bot
exports.bot = new telegraf_1.Telegraf(env_1.env.TELEGRAM_BOT_TOKEN);
async function startServer() {
    try {
        await mongoose_1.default.connect(env_1.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        // Setup Interaction Commands
        (0, bot_commands_1.setupBotCommands)();
        exports.bot.launch();
        console.log('🤖 Telegram Bot is running');
        task_scheduler_1.TaskScheduler.start();
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
process.once('SIGINT', () => exports.bot.stop('SIGINT'));
process.once('SIGTERM', () => exports.bot.stop('SIGTERM'));
