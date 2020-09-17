import {Message} from "node-telegram-bot-api";
import Route from "../../../src/interfaces/route.interface";

const routes: Route[] = [
    {
        name: 'foo',
        action: (_: Message) => 'bar'
    },
    {
        name: 'foo_flow',
        action: (_: Message) => {
            return {
                data: {
                    step: 0
                },
                response: 'foo_flow_start'
            }
        },
        flow: [
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}},
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}},
            (msg: Message, data: any) => {data.step++; return {data: data, response: 'step ' + data.step}}
        ]
    }
]
export default routes