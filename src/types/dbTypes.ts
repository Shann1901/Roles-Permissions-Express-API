import { Entities } from "./entityTypes";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface DbConfigJson extends PostgresConnectionOptions {
    type: 'postgres',
    host: string,
    username: string,
    password: string,
    database: string,
    synchronize: boolean,
    logging: boolean,
    entities: Entities
    subscribers?: [],
    migrations?: [],
    migrationsTableName?: string,
}