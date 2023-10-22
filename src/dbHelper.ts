
import { DataSource} from "typeorm";
import { singleton, registry, container} from 'tsyringe';
import { dataSourceInstance } from "./dbConfig";
import debug from 'debug';


const log: debug.IDebugger = debug('app: DB-initialization')

@registry([
    {
        token: 'DatabaseConfig',
        useValue: dataSourceInstance
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

