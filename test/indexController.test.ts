const chai = require('chai')
const assert = chai.assert
import IndexController from "../src/actions/IndexController";

describe('IndexController test', () => {
    it('should return pong from IndexController.ping', () => {
        // @ts-ignore
        assert.strictEqual(IndexController.ping({}), 'pong')
    })
})