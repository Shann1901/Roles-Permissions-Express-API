import fs from 'fs'
import { container, singleton } from 'tsyringe'
@singleton()
export class ConfigureRoutes {

    // This function will read all the route classes and attch the routes to the express application.
    // This will run during runtime as it is a dynamic import.
    // While running we import modules from the transpiled JS files in the ./dist folder.
    static async initializeRoutes() {
        await fs.readdir('./dist/Routes', async (err: NodeJS.ErrnoException, files: string[]) => {
            for (const file of files) {
                if (!['common.routes.config.js', 'configureRoutes.js'].includes(file)) {
                    const routeModule = await import('./' + file)
                    const routeInstance: any = container.resolve(routeModule.default)
                    routeInstance.attachRoutes()
                }
            }
        })
    }
}