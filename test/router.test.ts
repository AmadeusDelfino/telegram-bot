import {Message} from "node-telegram-bot-api";
import * as chai from 'chai'
const assert = chai.assert
import * as path from 'path'
import Router from '../src/router/router'

process.env.ROUTES_DIRECTORY = path.join(__dirname, 'stubs', 'routes')

Router.init()
const msg: Message = {chat: {id: 1, type: 'channel'}, date: 0, message_id: 0, text: '/foo_flow'}

describe('Router Test', () => {
    it('should return a object from router.match', () => {
        assert.strictEqual(typeof(Router.match('/foo')), 'object')
    })

    it('should return text \'bar\' from \'foo\' action', () => {
        assert.strictEqual('bar', Router.match('/foo').action({...msg, text: '/foo'}))
    })
})