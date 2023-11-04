import { UserDTO } from '../DTO/user.dto'
import {  Role, RolePermissions } from '../enums/user'

export const usersData: Array<UserDTO> = [
    {
        id: 1,
        firstName: "Shantanu",
        lastName: "Nigam",
        age: 27,
        email: "shantanunigam@1901@gmail.com",
        password:"#!2t79rhv#$6",
        role: Role.Admin,
        permissions: RolePermissions.getPermissions(Role.Admin)
    },
    {
        id: 2,
        firstName: "Adrew",
        lastName: "Pickle",
        age: 47,
        email: "mr.pickle@gmail.com",
        password:"#!2t79rhui###2",
        role: Role.AppUser,
        permissions: RolePermissions.getPermissions(Role.AppUser)
    },
    {
        id: 3,
        firstName: "Hobb",
        lastName: "Goblin",
        age: 17,
        email: "goblin.babaganush@gmail.com",
        password: "#!2t7mlhui###2",
        role: Role.AppUser,
        permissions: RolePermissions.getPermissions(Role.AppUser)
    },
    {
        id: 4,
        firstName: "Sagar",
        lastName: "Nigam",
        age: 30,
        email: "sagar.nigam.gr@gmail.com",
        password: "#!2t7mlkkji###2",
        role: Role.Admin,
        permissions: RolePermissions.getPermissions(Role.Admin)
    },
]