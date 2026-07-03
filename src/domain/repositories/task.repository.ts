import type { Task } from "../entities/task.entity.js";
import type { IBaseRepository } from "./base.repository.js";

export interface ITaskRepository extends IBaseRepository<Task>{
    findByProject(userId: string, projectId: string): Promise<Task[]>;
}