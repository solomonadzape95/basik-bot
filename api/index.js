import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import {
  handleStart,
  handleHelp,
  handleDocs,
  handleCommunity,
  handleUnrecognized,
} from "../handlers.js";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const url = process.env.BOT_URL;
const bot = new TelegramBot(token);

// Set webhook only when not in a Vercel environment
if (process.env.VERCEL_ENV === undefined) {
  bot
    .setWebHook(`${url}/api/index`)
    .then(() => {
      console.log("Webhook set successfully");
    })
    .catch((error) => {
      console.error("Failed to set Webhook:", error);
    });
}

// Setup bot command handlers
bot.onText(/\/start/, handleStart(bot));
bot.onText(/\/help/, handleHelp(bot));
bot.onText(/🆘 Help/, handleHelp(bot));
bot.onText(/\/docs/, handleDocs(bot));
bot.onText(/🤔 What is Base/, handleDocs(bot));
bot.onText(/\/community/, handleCommunity(bot));
bot.onText(/🤝 Community/, handleCommunity(bot));
bot.on("message", handleUnrecognized(bot));

// Vercel serverless function
export default async function handler(req, res) {
  if (req.method === "POST") {
    await bot.processUpdate(req.body);
    res.status(200).send("OK");
  } else {
    res.status(200).json({ message: "Webhook is set up correctly!" });
  }
}

