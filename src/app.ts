import Router from './router/router'
import TelegramBot, {Message} from "node-telegram-bot-api";

class App {
    public router: typeof Router = Router
    // @ts-ignore
    public botConnection: TelegramBot

    public init() {
        this.router.init()
        this.listenTelegramMessages()
    }

    private listenTelegramMessages() {
        const apiKey = process.env.TELEGRAM_KEY || ''
        this.botConnection = new TelegramBot(apiKey, {polling: true})
        this.botConnection.on('message', async (msg: Message) => {
            let response = this.router.executeRoute(msg)
            if (!!response && typeof response.then === 'function') response = await response

            this.botConnection
                .sendMessage(msg.chat.id, response)
                .catch((error: any) => console.log(error))
        })

        this.botConnection.on('polling_error', (error: Error) => {
            console.log(error)
        })
    }
}

export default new App