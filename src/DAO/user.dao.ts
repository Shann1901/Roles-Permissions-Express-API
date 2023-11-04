import { injectable, registry, singleton, inject } from "tsyringe";
import { UserDTO } from "../DTO/user.dto";
import { CRUD } from "./crud.interface";
import { dataSourceInstance } from "../dbConfig";
import User from "../entity/User";
import { Repository } from "typeorm";
import { userMapper } from "./mappers/user.dao.mapper";
import debug from "debug";

const log: debug.IDebugger = debug('app: user-dao')


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

    async getUser(id: number): Promise<any> {
        let userData = null
        log(`Fetching user with id: ${id}`)
        const user = await this.userRepo.findOne({
            where: {
                id: id
            },
            relations: {
                role: {
                    permissions: true
                }
            }
        })

        if (user) {
            userData = userMapper.mapToDTO(user)
        }
        log(`user with id: ${id}`, user)
        return userData
    }

    async getAllUsers(): Promise<any> {
        log(`Fetching all the users from the database`)
        const allUsers = await this.userRepo.find({
            relations: {
                role: {
                    permissions: true
                }
            }
        })

        const userDataToReturn = allUsers.map(userRecord => userMapper.mapToDTO(userRecord))
        log(`All the users from the database`, userDataToReturn)
        return userDataToReturn
    }

    async create(entity: UserDTO): Promise<UserDTO> {
        const mappedAsEntity = await userMapper.mapDTOToUserEntity(entity)
        const userEntity = await this.userRepo.save(mappedAsEntity)
        return userMapper.mapToDTO(userEntity)

    }
    async update(entity: UserDTO): Promise<UserDTO> {
        const mappedAsEntity = await userMapper.mapDTOToUserEntity(entity)
        const userEntity = await this.userRepo.save(mappedAsEntity)
        return userMapper.mapToDTO(userEntity)
    }
    async delete(id: number): Promise<Object> {
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
            return {
                id: removedEntity.id,
                message: `User with id: ${id} has been deleted with the corresponding user permissions`
            }
        }
        return {
            id: null,
            message: `User with id: ${id} not found`
        }
    }
    async patch(id: number, entityPropsToPatch: Partial<UserDTO>): Promise<UserDTO> {
        let updatedEntity: any
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
            const updatedUser = {
                ...userEntity,
                ...userMapper.mapPartialDTOPropsToPartialUserEntityAttrs(entityPropsToPatch)
            }
            updatedEntity = await this.userRepo.save(updatedUser)
        }

        return updatedEntity
    }
}