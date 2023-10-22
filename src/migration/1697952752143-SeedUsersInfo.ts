import { DataSource, MigrationInterface, QueryRunner } from "typeorm"
import { dataSourceInstance } from "../dbConfig"
import User  from '../entity/User'
import Role from "../entity/Role"
import Permission from "../entity/Permission"

export class SeedUsersInfo1697952752143 implements MigrationInterface {
    transaction = true
    readonly dataSource: DataSource = dataSourceInstance
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const getUersPermission = new Permission()
            getUersPermission.permission = 'getAllUsers'
            getUersPermission.description = 'Returns all the users'
            

            const editUserPermission = new Permission()
            editUserPermission.permission = 'editUser'
            editUserPermission.description = 'Ability to edit a User'

            const role = new Role()
            role.roleName = 'Admin'
            role.roleDescription = 'God level: can do anything'
            

            const userRepository = this.dataSource.getRepository(User)
            const user = new User()
            user.firstname = 'Shantanu'
            user.lastName = 'Nigam'
            user.email = 'shantanunigam1901@gmail.com'
            user.password = 'Shann123'
            user.age = 27

            // Relations connections (one-to-many, many-to-many)
            user.role = role
            role.permissions = [getUersPermission, editUserPermission]
    
            // With cascade: true on the entities, ater saving user, roles and permissions will be auto-saved by TypeORM
            userRepository.save(user)
        } catch (error) {
            throw new Error(error)
        }
        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
 
        const permissionRepository = this.dataSource.getRepository(Permission)
        const roleRepository = this.dataSource.getRepository(Role)
        const userRepository = this.dataSource.getRepository(User)

        permissionRepository.clear()
        roleRepository.clear()
        userRepository.clear()
    }

}
