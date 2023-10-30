import { Role, Permission } from "../enums/user"


export interface UserDTO {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
    role: Role,
    permissions?: Array<Permission>
}