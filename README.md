# Telegram Bot

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

### Implementação de flow de respostas do usuário
Se tratando de um chat-bot, um dos fluxos ideias é o bot fazer perguntas para o usuário, que por sua vez consegue 
responder para o bot que mantem o estado daquele fluxo de respostas. Para fazer isso, precisamos fazer algumas pequenas 
alterações nas actions já criadas. Primeiro, o objeto de rota deve conter a propriedade `flow`, que recebe um array de 
funções que serão executadas em sequência, além disso, a resposta das actions que contem flow de resposta também é um 
pouco diferente, ao invés de se retornar a string, é necessário enviar um objeto contendo as propriedades 
`response` e `data`, onde a propriedade `response` é a informação retornada ao usuário, e a propriedade `data` será 
repassada para a próxima função do flow de perguntas/respostas. Exemplo: 
```
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
```
Nesse exemplo em especial, no chat do usuário o bot vai enviar as seguintes mensagens: `step 1`, `step 2` e `step 3`. 
Independente da mensagem que o usuário enviar como resposta no flow. A recomendação máxima dessa funcionalidade é você
deixar para executar qualquer operação de banco ou API na última função do flow, assim você garante que não haverá 
nenhum erro no meio do flow que vai ser necessário um rollback de qualquer operação feita

## Todo
- [x] Criar workflow de respostas
- [ ] Permitir fazer match de rotas/actions via regex
- [ ] Criar sistema de log de erros da aplicação
- [ ] Habilitar webhook 
- [ ] Escalonamento horizontal
- [ ] Adicionar mais testes de unidade
- [ ] Criar um "bot sandbox" para testes de integração
