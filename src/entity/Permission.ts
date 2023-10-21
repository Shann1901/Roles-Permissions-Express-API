import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Role  from "./Role";

@Entity()
export default class Permission {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    permission: string

    @Column('text')
    description: string

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[]
}