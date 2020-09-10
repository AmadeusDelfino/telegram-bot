import Route from "../interfaces/route.interface";
import * as fs from 'fs'
import * as path from 'path'
import {Message} from "node-telegram-bot-api";

class Router {
    private availableRoutes: Map<string, Route> = new Map()

    get routes() {
        return this.availableRoutes
    }

    public init() {
        const routesFolder: string = process.env.ROUTES_DIRECTORY || ''
        fs
            .readdirSync(routesFolder)
            .forEach(file => {
                const route = require(path.resolve(process.cwd(), routesFolder + '/' + file))
                route.default.forEach((route: Route)  => {
                    this.availableRoutes.set(route.name, route)
                })
            })
    }

    public match(router: string): Function {
        router = router.replace('/', '')
        if(!this.availableRoutes.has(router)) throw new Error('Action ' + router + ' not found')

        // @ts-ignore
        return this.availableRoutes.get(router).action
    }

    public executeRoute(msg: Message) {
        const route = msg.text?.split(' ')[0] || ''
        const routeAction = this.match(route)

        return routeAction(msg)
    }
}

export default new Router