import type { TaskDTO } from "../../../domain/entities/task.entity.js";
import type { ITaskRepository } from "../../../domain/repositories/task.repository.js";
import type { ILogger } from "../../ports/logger.port.js";

export class ListTasksUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly logger: ILogger
    ) {}

    async execute(userId: string, projectId: string): Promise<TaskDTO[]> {
        this.logger.info("List tasks attempt", {
            userId,
            projectId,
        });
        const tasks = await this.taskRepository.findByProject(userId, projectId);

        this.logger.info("Tasks fetched successfully", {
            userId,
            projectId,
            totalTasks: tasks.length,
        });

        return tasks.map(task => task.toPrimitives());
    }
}