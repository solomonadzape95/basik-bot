// bot.js
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import {
  handleStart,
  handleHelp,
  handleDocs,
  handleCommunity,
  handleUnrecognized,
} from "./handlers.js";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, handleStart(bot));
bot.onText(/\/help/, handleHelp(bot));
bot.onText(/🆘 Help/, handleHelp(bot));
bot.onText(/\/docs/, handleDocs(bot));
bot.onText(/🤔 What is Base/, handleDocs(bot));
bot.onText(/\/community/, handleCommunity(bot));
bot.onText(/🤝 Community/, handleCommunity(bot));
bot.on("message", handleUnrecognized(bot));

bot.on("polling_error", (error) => {
  console.error(error);
});

console.log("Bot is running...");
