import express from 'express'

export abstract class CommonRoutesConfig {
    name: string
    app: express.Application

    constructor(name: string, app: express.Application) {
        this.name = name,
        this.app = app,
        this.attachRoutes()
    }

    getName(): string {
        return this.name
    }

    // Will attach the defined routes to the express application
    attachRoutes(): express.Application {
        const routes = this.defineRoutes()
        this.app.use(this.name, routes)
        return this.app
    }

    abstract defineRoutes(): express.Router
}