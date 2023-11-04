import { UserDTO } from "../../DTO/user.dto";
import User from "../../entity/User";
import Role from "../../entity/Role";
import Permission from "../../entity/Permission";
import { dataSourceInstance } from "../../dbConfig";
import { Role as RoleEnum, Permission as PermissionEnum, RolePermissions } from "../../enums/user";

function getRoleEnum(enumValue: string): RoleEnum {
    const roleValues = Object.values(RoleEnum)
    const index = roleValues.findIndex(val => val === enumValue)
    const enumKey = Object.keys(RoleEnum)[index] as keyof typeof RoleEnum
    return RoleEnum[enumKey]
} 

function getPermissionEnum(enumValue: string): PermissionEnum {
    const permissionValues = Object.values(PermissionEnum)
    const index = permissionValues.findIndex(val => val === enumValue)
    const enumKey = Object.keys(PermissionEnum)[index] as keyof typeof PermissionEnum
    return PermissionEnum[enumKey]
} 

export const userMapper = {
    roleRepo: dataSourceInstance.getRepository(Role),
    constructRole: (user: Partial<UserDTO>): Role => {
        const roleObj = new Role()
        roleObj.roleName = user.role ??RoleEnum.GuestUser
        roleObj.roleDescription = RolePermissions.getRoleDescription(user.role ?? RoleEnum.GuestUser)
        const permissions = RolePermissions.getPermissions(user.role ?? RoleEnum.GuestUser)
        for (const permission of permissions) {
            const permissionObj = new Permission() 
            permissionObj.permission = permission
            permissionObj.description = RolePermissions.getPermissionDescription(permission)
            if (!roleObj.permissions) {
                roleObj.permissions = []
            } else {
                roleObj.permissions.push(permissionObj)
            }
        }
        return roleObj
        
    },
    mapToDTO: (user: User): UserDTO => { 
        return {
            ...user,
            firstName: user.firstName,
            role: getRoleEnum(user?.role.roleName),
            permissions: ((): Array<PermissionEnum> => {
                const permissions = []
                for (const permission of user?.role.permissions) {
                    permissions.push(getPermissionEnum(permission.permission))
                }
                return permissions
            })()
        }
    },
    mapDTOToUserEntity: async (user: UserDTO): Promise<User> => {
        const existingRole = await userMapper.roleRepo.findOne({
            where: {
                roleName: user.role
            },
            relations: {
                permissions: true
            }
        })
        
        return {
            ...user,
            role: existingRole ?? userMapper.constructRole(user)
        }
    },
    mapPartialDTOPropsToPartialUserEntityAttrs: async (entityPropsToPatch: Partial<UserDTO>): Promise<object> => {
        type DynamicObject = {
            [key: string]: any;
          };
        const partialDTO: DynamicObject = {}
        if (entityPropsToPatch.role) {
            const existingRole = await userMapper.roleRepo.findOne({
                where: {
                    roleName: entityPropsToPatch.role
                },
                relations: {
                    permissions: true
                }
            })
            partialDTO.role = existingRole ?? userMapper.constructRole(entityPropsToPatch)
            if (partialDTO.role && partialDTO.role.permissions) {
                partialDTO.permissions = partialDTO.role.permissions  || []
            } 
        }
        return {
            ...entityPropsToPatch,
            ...partialDTO
        }
    }
}