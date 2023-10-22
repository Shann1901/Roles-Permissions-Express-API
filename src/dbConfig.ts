import { DataSource } from "typeorm";
import { singleton } from "tsyringe";
import { DbConfigJson } from "./types/dbTypes";
import User from './entity/User' 
import Role from './entity/Role'
import Permission from './entity/Permission'
import { environmentConfigs } from "./env.config"


@singleton()
export class DbConfig {
    private static configJson: DbConfigJson = {
        type: 'postgres',
        host: environmentConfigs['POSTGRES_HOST'] || '',
        username: environmentConfigs['POSTGRES_USER'] || '',
        password: environmentConfigs['POSTGRES_PASSWORD'] || '',
        database: environmentConfigs['POSTGRES_DB'] || '',
        synchronize: true,
        logging: environmentConfigs['DEBUG'] === 'true',
        entities: [User, Role, Permission],
        subscribers: [],
        migrations: [],
    }

    private static dbSourceInstance: DataSource | null = null

    static getDataSource() {
        if (!DbConfig.dbSourceInstance) {
            DbConfig.dbSourceInstance = new DataSource({ ...DbConfig.configJson })
        }

        return DbConfig.dbSourceInstance
    }
}