import { DataSource, MigrationInterface, QueryRunner } from "typeorm"
import { dataSourceInstance } from "../dbConfig"
import User  from '../entity/User'
import Role from "../entity/Role"
import Permission from "../entity/Permission"
import { usersData } from "./userData"
import { RolePermissions } from "../enums/user"

export class SeedUsersInfo1697952752143 implements MigrationInterface {
    transaction = true
    readonly dataSource: DataSource = dataSourceInstance
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            for (const userData of usersData) {
                if (userData.permissions) {
                    const permissonsToSave = []
                    for (const permission of userData.permissions) {
                        const permissionInstance = new Permission()
                        permissionInstance.permission = permission
                        permissionInstance.description = RolePermissions.getPermissionDescription(permission)
                        permissonsToSave.push(permissionInstance)
                    }

                    const roleInstance = new Role()
                    roleInstance.roleName = userData.role
                    roleInstance.roleDescription = RolePermissions.getRoleDescription(userData.role)

                    const userRepository = this.dataSource.getRepository(User)
                    const userInstance = new User()
                    userInstance.firstname = userData.firstName
                    userInstance.lastName = userData.lastName
                    userInstance.email = userData.email
                    userInstance.password = userData.password
                    userInstance.age = userData.age

                    // Relations connections (one-to-many, many-to-many)
                    userInstance.role = roleInstance
                    roleInstance.permissions = [...permissonsToSave]
    
                    // With cascade: true on the entities, ater saving user, roles and permissions will be auto-saved by TypeORM
                    userRepository.save(userInstance)
                }

            }
            
        } catch (error) {
            throw new Error(error)
        }
        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
 
        const permissionRepository = this.dataSource.getRepository(Permission)
        const roleRepository = this.dataSource.getRepository(Role)
        const userRepository = this.dataSource.getRepository(User)
        const userPermissionRepository = this.dataSource.getRepository("role_permissions_permission")

        const allUsers = await userRepository.find({
            relations: {
                role: {
                    permissions: true
                }
            }
        })

        for (const user of allUsers) {
            const role = user.role
            const permissions = role.permissions
           
            for (const permission of permissions) {
                userPermissionRepository.delete({
                    roleId: role.id,
                    permissionId: permission.id
                })
                permissionRepository.delete({
                    id: permission.id
                })
            }
            userRepository.delete({ id: user.id}) 
            roleRepository.delete({ id: role.id }) 
        }
    }

}
