import express from 'express'
import { UserController } from '../controllers/user.controller';
import { CommonRoutesConfig } from './common.routes.config'
import { injectable, singleton, inject, registry, container } from "tsyringe";

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
    private userController: UserController
    constructor(@inject('parentPath') name: string, @inject('expressApp') app: express.Application) {
        super(name, app)
        this.userController = container.resolve(UserController)
    }

    defineRoutes(): express.Router {
        router.route('/all')
        .get(async (req: express.Request, res: express.Response) => {
            const allUsers = await this.userController.getAllUsers()
            res.status(200).json(allUsers)
        })

        return router
    }
}
