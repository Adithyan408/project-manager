export interface BaseRepository<TEntity>{
    save(entity: TEntity): void;

    findBy(userId: string, id: string): Promise<TEntity | null>;

    delete(userId: string, id: string): Promise< void >
}