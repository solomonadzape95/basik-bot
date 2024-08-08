import dotenv from "dotenv";
import express from 'express'
import TelegramBot from "node-telegram-bot-api";
dotenv.config();
import {
  handleStart,
  handleHelp,
  handleDocs,
  handleCommunity,
  handleUnrecognized,
} from "./handlers.js";

const app = express();
app.use(express.json())
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);
bot.setWebHook(`${process.env.BOT_URL}/bot${token}`)

// bot.on("polling_error", (error) => {
//   console.error(error);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`)
})
app.post(`/bot${token}`,(req,res)=>{
  bot.processUpdate(req.body);
  res.sendStatus(200);
})

bot.onText(/\/start/, handleStart(bot));
bot.onText(/\/help/, handleHelp(bot));
bot.onText(/🆘 Help/, handleHelp(bot));
bot.onText(/\/docs/, handleDocs(bot));
bot.onText(/🤔 What is Base/, handleDocs(bot));
bot.onText(/\/community/, handleCommunity(bot));
bot.onText(/🤝 Community/, handleCommunity(bot));
bot.on("message", handleUnrecognized(bot));
