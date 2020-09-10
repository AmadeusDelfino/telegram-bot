require('dotenv').config()
import {Message} from "node-telegram-bot-api";
const TelegramBot = require('node-telegram-bot-api')
const apiKey = process.env.TELEGRAM_KEY
import App from './src/app'

const bot = new TelegramBot(apiKey, {polling: true})

bot.on('message', async (msg: Message) => {
    let response = App.router.executeRoute(msg)
    if(!!response && typeof response.then === 'function') response = await response

    bot
        .sendMessage(msg.chat.id, response)
        .catch((error: any) => console.log(error))
})

bot.on('polling_error', (error: Error) => {
    console.log(error)
})

App.init()
