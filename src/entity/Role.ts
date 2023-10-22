import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import User  from "./User";
import Permission  from "./Permission";


@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roleName: string

    @Column('text')
    roleDescription: string

    @OneToMany(() => User, (user) => user.role)
    users: User[] 

    @ManyToMany(() => Permission, (permission) => permission.roles, {
        cascade: true
    })
    @JoinTable()
    permissions: Permission[]
}