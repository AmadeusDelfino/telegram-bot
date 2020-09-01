#Telegram Bot

O objetivo deste projetp é fornecer uma interface simples e objetiva para a utilização de bots no Telegram

## Utilização

1) Primeiro, é necessári instalar todas as dependências do projeto: `npm install`
2) Agora, renomeie o arquivo `.env.example` para `.env` e preencha a chave `TELEGRAM_KEY` com sua chave do Telegram
3) Agora, é só começar a utilizar! =)

### Implementação de ações

O Telegram Bot se baseia em ações que são executadas assim que comandos são fornecidos. A criação de novos comandos se 
baseia em duas etapas:
1) Criação do controller que vai lidar com as ações (opcional)
2) Arquivo que contem a lista das ações

O arquivo de rotas deve ser colocado no path definido como o caminho das rotas, por padrão é `/src/routes`. O 
Telegram Bot carrega automaticamente todas as rotas definidas nessa pasta. A estrutura padrão para definir uma rota é 
criar um objeto contendo as chaves `name`, `description` e `action`. Exemplo:
```
const controller = require('./../actions/IndexController')

module.exports = [
    {
        name: 'ping',
        description: 'Apenas um pong',
        action: controller.ping,
    },
    {
        name: 'help',
        description: 'Lista todos os comandos disponíveis'
        action: controller.help,
    }
]
```
Por padrão, todos os métodos que serão executados devem receber como parâmetro a mensagem enviada pelo bot. Para saber
tudo que é possível fazer com a mensagem, veja esse repositório: 
[https://github.com/yagop/node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)