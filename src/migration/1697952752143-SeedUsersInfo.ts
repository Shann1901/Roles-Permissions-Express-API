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
            const permissionRepository = this.dataSource.getRepository(Permission)
            const roleRepository = this.dataSource.getRepository(Role)
            const userRepository = this.dataSource.getRepository(User)

            for (const userData of usersData) {
                if (userData.permissions) {
                    const permissonsToSave = []
                    for (const permission of userData.permissions) {
                        let permissionInstance
                        const permissionRecord = await permissionRepository.find({
                            where: {
                                permission: permission
                            }
                        }) 
                        if (!permissionRecord[0]) {
                            permissionInstance = new Permission()
                            permissionInstance.permission = permission
                            permissionInstance.description = RolePermissions.getPermissionDescription(permission)
                        }
                        permissonsToSave.push(permissionRecord[0] ?? permissionInstance)
                       
                    }


                    let roleInstance = null
                    const roleRecord = await roleRepository.find({
                        where: {
                            roleName: userData.role
                        }
                    })

                    if (!roleRecord[0]) {
                        roleInstance = new Role()
                        roleInstance.roleName = userData.role
                        roleInstance.roleDescription = RolePermissions.getRoleDescription(userData.role)
                    }

                    
                    const userInstance = new User()
                    userInstance.firstName = userData.firstName
                    userInstance.lastName = userData.lastName
                    userInstance.email = userData.email
                    userInstance.password = userData.password
                    userInstance.age = userData.age

                    // Relations connections (one-to-many, many-to-many)
                    userInstance.role = roleRecord[0] ?? roleInstance

                    if (roleInstance) {
                        roleInstance.permissions = [...permissonsToSave]
                    } else {
                        roleRecord[0].permissions = [...permissonsToSave]
                    }    
                    
    
                    // With cascade: true on the entities, ater saving user, roles and permissions will be auto-saved by TypeORM
                    await userRepository.save(userInstance)
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
               await userPermissionRepository.delete({
                    roleId: role.id,
                    permissionId: permission.id
                })
            }
            await userRepository.delete({ id: user.id}) 
        }
        await roleRepository.delete({})
        await permissionRepository.delete({})
    }

}
