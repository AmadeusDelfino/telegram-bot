import Route from "../interfaces/route.interface";

class FlowContext {
    public step: number
    public originalAction: Route
    public data: any

    constructor(originalAction: Route, data: any, step: number = 0) {
        this.originalAction = originalAction
        this.data = data
        this.step = step
    }

    public incrementStep() {
        this.step++
    }

    public setData(data: any) {
        this.data = data
    }

    public getNextFlow(): Function {
        // @ts-ignore
        return this.originalAction.flow[this.step]
    }

    public hasNextFlow(): boolean {
        // @ts-ignore
        return this.step < this.originalAction.flow.length
    }
}

export default FlowContext