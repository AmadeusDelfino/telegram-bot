let routes = new Map()
const fs = require('fs')
const path = require('path')

module.exports = {
    init: () => {
        const routesFolder = path.join(__dirname, '..', 'routes')
        fs
            .readdirSync(routesFolder)
            .forEach(file => {
                const route = require(path.join(routesFolder, file))
                route.forEach(route => {
                    routes.set(route.name, route)
                })
            })
    },
    routes: (printInConsole = false) => {
        if(printInConsole) {
            routes.forEach(route => {
                console.table(route)
            })
        }

        return routes
    },
    match: (router) => {
        router = router.replace('/', '')
        if(!routes.has(router)) throw new Error('Action ' + router + ' not found')

        return routes.get(router).action
    },
    executeRoute: function(msg) {
        const route = msg.text.split(' ')[0]
        const routeAction = this.match(route)

        return routeAction(msg)
    }
}