const chai = require('chai')
const assert = chai.assert
const path = require('path')
const router = require('../src/router/router')

process.env.ROUTES_DIRECTORY = path.join(__dirname, 'stubs', 'routes')

router.init()

describe('Router Test', () => {
    it('should return a function from router.match', () => {
        assert.strictEqual(typeof(router.match('/foo')), 'function')
    })

    it('should return text \'bar\' from \'foo\' action', () => {
        assert.strictEqual('bar', router.match('/foo')())
    })
})