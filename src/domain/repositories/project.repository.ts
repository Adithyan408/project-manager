import type { Project } from "../entities/project.entity.js";
import type { BaseRepository } from "./base.repository.js";

export interface ProjectRepository extends BaseRepository<Project>{
    findMany(userId: string): Promise<Project[]>;

    exists(id: string, userId: string): Promise<boolean>

}
