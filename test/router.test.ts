const chai = require('chai')
const assert = chai.assert
import * as path from 'path'
import Router from '../src/router/router'

process.env.ROUTES_DIRECTORY = path.join(__dirname, 'stubs', 'routes')

Router.init()

describe('Router Test', () => {
    it('should return a function from router.match', () => {
        assert.strictEqual(typeof(Router.match('/foo')), 'function')
    })

    it('should return text \'bar\' from \'foo\' action', () => {
        assert.strictEqual('bar', Router.match('/foo')())
    })
})