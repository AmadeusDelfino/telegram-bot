const router = require('./../router/router')

module.exports = {
    ping: (msg) => {
        return 'pong'
    },
    help: (msg) => {
        let string = 'Comandos disponíveis \n'
        router.routes().forEach(route => {
            string += '/' + route.name + ': ' + route.description + '\n'
        })

        return string
    }
}