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
                    container.resolve(routeModule.default)

                    // After resolving the instance, it will be created by the DI container.
                    // while creation it will automatically attach the routes to the express application.
                    // No need to attach routes explicitly after instance resolution.  
                }
            }
        })
    }
}