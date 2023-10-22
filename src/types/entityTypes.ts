import Permission from "../entity/Permission";
import Role from "../entity/Role";
import User from "../entity/User";

export type Entity = (new () => User)  | (new () => Role) | (new () => Permission)

export type Entities = Entity[]