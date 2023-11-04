import { injectable, singleton, container } from "tsyringe"; 
import { UserDAO } from "../DAO/user.dao";
import { UserDTO } from "../DTO/user.dto";


@singleton()
@injectable()
export class UserService {
    private userDAO: UserDAO
    constructor() {
        this.userDAO = container.resolve(UserDAO)
    }

    async getUser(id: number): Promise<any> {
        return this.userDAO.getUser(id)
    }

    async getAllUsers(): Promise<any> {
        return this.userDAO.getAllUsers()
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
        return this.userDAO.create(user)
    }

    async updateUser(user: UserDTO): Promise<UserDTO> {
        return this.userDAO.update(user)
    }

    async deleteUser(id: number): Promise<Object> {
        return this.userDAO.delete(id)
    } 

    async patchUser(id: number, entityPropsToPatch: Partial<UserDTO>): Promise<UserDTO> {
        return this.userDAO.patch(id, entityPropsToPatch)
    }
}


