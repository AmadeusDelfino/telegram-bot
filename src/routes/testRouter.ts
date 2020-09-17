import {Message} from "node-telegram-bot-api";

export default [
    {
        name: 'test',
        action: (msg: Message) => {
            return {
                response: 'Test initial',
                data: {
                    step: 0
                }
            }
        },
        description: 'Flow test',
        flow: [
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}},
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}},
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}},
        ]
    }
]