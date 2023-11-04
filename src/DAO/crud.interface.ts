export interface CRUD<T> {
    create(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: number): Promise<Object>
    patch(id: number, entityPropsToPatch: Partial<T>): Promise<T>
}