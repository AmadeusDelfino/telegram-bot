import IndexController from "../actions/IndexController";

export default [
    {
        name: 'ping',
        action: IndexController.ping,
        description: 'Apenas um pong',
    },
    {
        name: 'help',
        action: IndexController.help,
        description: 'Lista todos os comandos disponíveis'
    }
]