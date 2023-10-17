import fs from 'fs'


export const configureRoutes = () => {
    fs.readdir('./', (err: NodeJS.ErrnoException, files: string[]) => {
        for (const file of files) {
            if (file !== 'common.routes.config.ts') {
                

            }
        }
    })
}