import User from './entity/User' 
import Role from './entity/Role'
import Permission from './entity/Permission'
import { DataSource} from "typeorm";
import { singleton, registry, container} from 'tsyringe';
import debug from 'debug';
import { environmentConfigs } from "./env.config"

const log: debug.IDebugger = debug('app: DB-initialization')

@registry([
    {
        token: 'DatabaseConfig',
        useValue: new DataSource({
            type: 'postgres',
            host: environmentConfigs['POSTGRES_HOST'] || '',
            username: environmentConfigs['POSTGRES_USER'] || '',
            password: environmentConfigs['POSTGRES_PASSWORD'] || '',
            database: environmentConfigs['POSTGRES_DB'] || '',
            synchronize: true,
            logging: true,
            entities: [User, Role, Permission],
            subscribers: [],
            migrations: [],
        })
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

