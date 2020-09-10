import {Message} from "node-telegram-bot-api";

export default [
    {
        name: 'foo',
        action: (_: Message) => 'bar'
    }
]