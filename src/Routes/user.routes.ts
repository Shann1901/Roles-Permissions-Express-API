import express from 'express'
import { CommonRoutesConfig } from './common.routes.config'
import { injectable, singleton, inject, registry } from "tsyringe";

const router = express.Router()

@registry(
        [
            {
                token: 'parentPath',
                useValue: '/users'
            }
        ]
    )
@injectable()
@singleton()
export default class UserRoutes extends CommonRoutesConfig {
    static routeClassType: UserRoutes
    constructor(@inject('parentPath') name: string, @inject('expressApp') app: express.Application) {
        super(name, app)
    }

    defineRoutes(): express.Router {
        router.route('/all')
        .get((req: express.Request, res: express.Response) => {
            res.send([{
                id: 1,
                name: 'Shantanu'
            }])
        })

        return router
    }
}
