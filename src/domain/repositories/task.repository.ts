import type { Task } from "../entities/task.entity.js";
import type { BaseRepository } from "./base.repository.js";

export interface TaskRepository extends BaseRepository<Task>{
    findByProject(userId: string, projectId: string): Promise<Task[]>;
}