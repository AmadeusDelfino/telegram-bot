const chai = require('chai')
const assert = chai.assert
const controller = require('../src/actions/IndexController')

describe('IndexController test', () => {
    it('should return pong from IndexController.ping', () => {
        assert.strictEqual(controller.ping({}), 'pong')
    })
})