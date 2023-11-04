import debug from 'debug';
import { UserService } from "../services/user.service";
import { injectable, singleton, container } from "tsyringe";
import { UserDTO } from '../DTO/user.dto';

const log: debug.IDebugger = debug('app: user-service')


@injectable()
@singleton()
export class UserController {
    private userService: UserService
    constructor() {
        this.userService = container.resolve(UserService)
    }

    async getUser(id: number): Promise<any> {
        log(`Fetching user with id: ${id}`)
        return this.userService.getUser(id)
    }

    async getAllUsers(): Promise<any> {
        log(`Fetching all the users`)
        return this.userService.getAllUsers()
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
        log('Creating User in the DB')
        return this.userService.createUser(user)
    }

    async updateUser(user: UserDTO): Promise<UserDTO> {
        log('Updating the user with the provided information')
        return this.userService.updateUser(user)
    }

    async deleteUser(id: number): Promise<Object> {
        log('Deleting the user from the DB')
        return this.userService.deleteUser(id)
    }

    async patchUser(id: number, entityPropsToPatch: Partial<UserDTO>): Promise<UserDTO> {
        log('Patching the user in the DB')
        return this.userService.patchUser(id, entityPropsToPatch)
    }

} 