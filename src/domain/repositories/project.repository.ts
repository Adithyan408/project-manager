import type { Project } from "../entities/project.entity.js";
import type { IBaseRepository } from "./base.repository.js";

export interface IProjectRepository extends IBaseRepository<Project>{
    findMany(userId: string): Promise<Project[]>;

    exists(id: string, userId: string): Promise<boolean>

}
