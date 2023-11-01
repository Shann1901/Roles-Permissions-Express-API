export interface CRUD<T> {
    create(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: number): Promise<number>
    patch(id: number, entityPropsToPatch: Partial<T>): Promise<T>
}