// The Reflect polyfill import should only be added once, and before DI is used:
import "reflect-metadata"
import { container } from 'tsyringe'
import { ConfigureRoutes } from './routes/configureRoutes'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import express, { Request, Response } from 'express'
import dotenv from "dotenv"

dotenv.config()

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}

const app = express()


// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json())

// The expressWinston.logger hooks into Express.js, automatically logging details for every completed request
app.use(expressWinston.logger(loggerOptions))


const portNumber = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

container.register("expressApp", {
    useValue: app
})

ConfigureRoutes.initializeRoutes()

app.listen(portNumber, () => {
    console.log(`Server started at port: ${portNumber}`)
})