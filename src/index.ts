import express, { Request, Response } from 'express'

const app = express()

const portNumber = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(portNumber, () => {
    console.log(`Server started at port: ${portNumber}`)
})