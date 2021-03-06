import {Message} from "node-telegram-bot-api";

interface Route {
    name: string
    action(msg: Message): any
    description?: string
    flow?: Array<Function>
}

export default Route