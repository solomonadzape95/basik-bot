import dotenv from "dotenv";
import express from 'express'
import TelegramBot from "node-telegram-bot-api";
import {
  handleStart,
  handleHelp,
  handleDocs,
  handleCommunity,
  handleUnrecognized,
} from "./handlers.js";
dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;
const token = process.env.TELEGRAM_BOT_TOKEN;
const url = process.env.BOT_URL;
const bot = new TelegramBot(token);

bot.setWebHook(`${url}/bot${token}`).then(() => {
  console.log('Webhook set successfully')
}).catch(error => {
  console.error('Failed to set Webhook:'. error)
})

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
bot
  .getWebhookInfo()
  .then((info) => {
    console.log("Webhook info:", info);
  })
  .catch((error) => {
    console.error("Failed to get webhook info:", error);
  });
