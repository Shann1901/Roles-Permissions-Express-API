import User from './entity/User' 
import { DataSource } from "typeorm";

export const DatabaseConfig = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'Shantanu',
    password: 'admin123',
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})