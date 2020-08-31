const router = require('./router/router')

module.exports = {
    init: () => {
        router.init()
    },
    router: () => router
}