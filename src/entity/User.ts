import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Role  from "./Role"

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(() => Role, (role) => role.users)
    role: Role

}
