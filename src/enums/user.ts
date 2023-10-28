export enum Permission {
    AddUser = 'addUser',
    EditUser = 'editUser',
    DeleteUser = 'deleteUser',
    ListAllUsers = 'listUsers',
    AddPermission = 'addPermission',
    RemovePermission = 'removePermission'
}

export enum Role {
    Admin = 'admin',
    AppUser = 'app_user',
    GuestUser = 'guest_user'
}

 
export class RolePermissions {
    static getPermissions(role: Role) {
        switch(role) {
            case Role.Admin: {
                return [
                    Permission.AddPermission, 
                    Permission.RemovePermission, 
                    Permission.AddUser, 
                    Permission.DeleteUser,
                    Permission.EditUser,
                    Permission.ListAllUsers
                ]
            }
            case Role.AppUser: {
                return [
                    Permission.EditUser,
                    Permission.DeleteUser
                ]
            }
            default: {
                return []
            }
        }
    }

    static getPermissionDescription(permission: Permission) {
        switch(permission) {
            case Permission.AddPermission: {
                return 'Will add permission for the user'
            }
            case Permission.RemovePermission: {
                return 'Will remove the specific permission for the user'
            } 
            case Permission.AddUser: {
                return 'Adds a new user'
            }
            case Permission.DeleteUser: {
                return 'Deletes a user from the DB'
            }
            case Permission.EditUser: {
                return 'Will help in editing a user'
            }
            case Permission.ListAllUsers: {
                return 'Will retun a list of all users in the DB'
            }
            default: {
                return ''
            }
        }
    }

    static getRoleDescription(role: Role) {
        switch(role) {
            case Role.Admin: {
                return 'God of the Application'
            }
            case Role.AppUser: {
                return 'Normal User of the Application'
            }
            case Role.GuestUser: {
                return ' A unusual User passing by'
            }
            default: {
                return ''
            }
        }
    }
    
} 