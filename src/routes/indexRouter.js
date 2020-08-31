const controller = require('./../actions/IndexController')

module.exports = [
    {
        name: 'ping',
        action: controller.ping,
        description: 'Apenas um pong',
    },
    {
        name: 'help',
        action: controller.help,
        description: 'Lista todos os comandos disponíveis'
    }
]