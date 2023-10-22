
import { DataSource} from "typeorm";
import { singleton, registry, container} from 'tsyringe';
import { DbConfig } from "./dbConfig";
import debug from 'debug';


const log: debug.IDebugger = debug('app: DB-initialization')

@registry([
    {
        token: 'DatabaseConfig',
        useValue: DbConfig.getDataSource()
    }
])
@singleton()
export class DbHelper {
    
    static async initializeDB() {
         try {
            const dataSource: DataSource = container.resolve('DatabaseConfig')
            await dataSource.initialize()
            log(`Initialized the database...`)
        } catch(error) {
            console.log(error)
            log(error)
        }
    }
}

