import 'dotenv/config';
import app from './app';
import { env } from './config/env';
import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';
import { TaskScheduler } from './modules/task/task.scheduler';
import { setupBotCommands } from './bot.commands';

const PORT = parseInt(env.PORT, 10) || 3000;

// Initialize Telegram Bot
export const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

async function startServer() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Setup Interaction Commands
    setupBotCommands();

    bot.launch();
    console.log('🤖 Telegram Bot is running');

    TaskScheduler.start();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
