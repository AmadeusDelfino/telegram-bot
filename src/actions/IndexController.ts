import {Message} from "node-telegram-bot-api";

import Router from '../router/router'

class IndexController {
    public ping(_: Message) {
        return 'pong'
    }

    public help(_: Message) {
        let string = 'Comandos disponíveis \n'
        Router.routes.forEach(route => {
            string += '/' + route.name + ': ' + route.description + '\n'
        })

        return string
    }
}

export default new IndexController