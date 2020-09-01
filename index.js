const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const apiKey = process.env.TELEGRAM_KEY
const app = require('./src/app')
const bot = new TelegramBot(apiKey, {polling: true})

bot.on('message', (msg) => {
    bot
        .sendMessage(msg.chat.id, app.router().executeRoute(msg))
        .catch(error => console.log(error))
})

bot.on('polling_error', (error) => {
    console.log(error)
})

app.init()
