import Router from './router/router'

class App {
    public router: typeof Router = Router

    public init() {
        this.router.init()
    }
}

export default new App