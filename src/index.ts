// The Reflect polyfill import should only be added once, and before DI is used:
import "reflect-metadata"
import { container } from 'tsyringe'
import { UserRoutes } from './Routes/user.routes'
import express, { Request, Response } from 'express'

const app = express()

container.register("expressApp", {
    useValue: app
})

const portNumber = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

const userRoutes = container.resolve(UserRoutes)
userRoutes.attachRoutes()

app.listen(portNumber, () => {
    console.log(`Server started at port: ${portNumber}`)
})