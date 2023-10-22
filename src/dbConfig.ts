import { DataSource } from "typeorm";
import { singleton } from "tsyringe";
import { DbConfigJson } from "./types/dbTypes";
import User from './entity/User' 
import Role from './entity/Role'
import Permission from './entity/Permission'
import { SeedUsersInfo1697952752143 } from './migration/1697952752143-SeedUsersInfo'
import { environmentConfigs } from "./env.config"


@singleton()
class DbConfig {
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
        migrations: [SeedUsersInfo1697952752143],
    }

    private static dbSourceInstance: DataSource | null = null

    static getDataSource() {
        if (!DbConfig.dbSourceInstance) {
            DbConfig.dbSourceInstance = new DataSource({ ...DbConfig.configJson })
        }

        return DbConfig.dbSourceInstance
    }
}

export const dataSourceInstance: DataSource = DbConfig.getDataSource()