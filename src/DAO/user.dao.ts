import { injectable, registry, singleton, inject } from "tsyringe";
import { UserDTO } from "../DTO/user.dto";
import { CRUD } from "./crud.interface";
import { dataSourceInstance } from "../dbConfig";
import User from "../entity/User";
import { Repository } from "typeorm";
import { userMapper } from "./mappers/user.dao.mapper";


@registry([
    {
        token: 'userRepository',
        useValue: dataSourceInstance.getRepository(User)
    }
])
@singleton()
@injectable()
export class UserDAO implements CRUD<UserDTO> {
    private userRepo: Repository<User>
    constructor(@inject('userRepository') repository : Repository<User>) {
        this.userRepo = repository
    }

    async create(entity: UserDTO): Promise<UserDTO> {
        const mappedAsEntity = userMapper.mapDTOToUserEntity(entity)
        const userEntity = await this.userRepo.save(mappedAsEntity)
        return userMapper.mapToDTO(userEntity)

    }
    async update(entity: UserDTO): Promise<UserDTO> {
        const mappedAsEntity = userMapper.mapDTOToUserEntity(entity)
        const userEntity = await this.userRepo.save(mappedAsEntity)
        return userMapper.mapToDTO(userEntity)
    }
    async delete(id: number): Promise<number> {
        const userPermissionRepository = dataSourceInstance.getRepository("role_permissions_permission")
        const userEntity = await this.userRepo.findOne({
            where: {
                id: id
            },
            relations: {
                role: {
                    permissions: true
                }
            }
        })
        if (userEntity) {
            const role = userEntity.role
            const permissions = role.permissions
           
            for (const permission of permissions) {
               await userPermissionRepository.delete({
                    roleId: role.id,
                    permissionId: permission.id
                })
            }
            const removedEntity = await this.userRepo.remove(userEntity)
            return removedEntity.id
        }
        return 0
    }
    async patch(id: number, entityPropsToPatch: Partial<UserDTO>): Promise<UserDTO> {
        const userEntity = await this.userRepo.findOne({
            where: {
                id: id
            },
            relations: {
                role: {
                    permissions: true
                }
            }
        })
        let updatedEntity = null
        if (userEntity) {
            const updatedUser = {
                ...userEntity,
                ...userMapper.mapDTOToUserEntity(entityPropsToPatch)
            }
            updatedEntity = await this.userRepo.save(userEntity)
        }

        return updatedEntity ? userMapper.mapToDTO(updatedEntity)
    }
}