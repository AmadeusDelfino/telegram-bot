import Route from "../interfaces/route.interface"
import {readdirSync} from 'fs'
import {resolve as pathResolve} from 'path'
import {Message} from "node-telegram-bot-api"
import isFlow from "../utils/isFlow"
import awaitIfNecessary from "../utils/awaitIfNecessary"
import FlowContext from "./FlowContext"
import {findBestMatch} from 'string-similarity'

class Router {
    private availableRoutes: Map<string, Route> = new Map()
    private currentWorkflow: Map<number, FlowContext> = new Map()

    get routes() {
        return this.availableRoutes
    }

    public init() {
        const routesFolder: string = process.env.ROUTES_DIRECTORY || ''
        this.loadRoutesFromFolder(routesFolder)
    }

    public loadRoutesFromFolder(routesFolder: string) {
        readdirSync(routesFolder)
            .forEach(file => {
                const route = require(pathResolve(process.cwd(), routesFolder + '/' + file))
                route.default.forEach((route: Route) => {
                    this.availableRoutes.set(route.name, route)
                })
            })
    }

    public match(router: string): Route {
        if (!this.availableRoutes.has(router)) throw new Error('Action ' + router + ' not found')

        // @ts-ignore
        return this.availableRoutes.get(router)
    }

    public executeRoute(msg: Message) {
        let routeAction = null
        const actionRequested = msg.text?.split(' ')[0].replace('/', '') || ''
        if (isFlow(msg.text)) {
            return this.executeFlow(msg)
        }
        try{
            routeAction = this.match(actionRequested)
        } catch (e) {
            return this.handleSimilarityRoute(actionRequested)
        }

        if (routeAction.flow !== undefined) {
            return this.executeInitFlow(msg, routeAction)
        }

        return routeAction.action(msg)
    }

    private async executeInitFlow(msg: Message, routeAction: Route) {
        const response = await awaitIfNecessary(routeAction.action(msg))
        this.currentWorkflow.set(msg.chat.id, new FlowContext(routeAction, response.data))

        return response.response
    }

    private async executeFlow(msg: Message) {
        const context: FlowContext | undefined = this.currentWorkflow.get(msg.chat.id)
        if (context === undefined) {
            return 'Comando não encontrado'
        }

        if (context.hasNextFlow()) {
            const response: { response: string, data: any } = await awaitIfNecessary(context.getNextFlow()(msg, context.data))
            context.setData(response.data)
            context.incrementStep()
            this.currentWorkflow.set(msg.chat.id, context)

            return response.response
        }

        return 'Você já fez tudo que era necessário com esse comando. Tente outro!'
    }

    private handleSimilarityRoute(action: string): string {
        const routes: string[] = []

        for (let entry of Array.from(this.availableRoutes.entries())) {
            routes.push(entry[0])
        }

        const bestMatch = findBestMatch(action, routes).bestMatch
        if(bestMatch.rating > 0.7) {
            return "Provavelmente você quis dizer /" + bestMatch.target
        }

        return 'Ação não encontrada'
    }
}

export default new Router