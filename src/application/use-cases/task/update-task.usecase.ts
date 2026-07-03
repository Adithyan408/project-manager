import type { TaskDTO } from "../../../domain/entities/task.entity.js";
import type { ITaskRepository } from "../../../domain/repositories/task.repository.js";
import { TaskStatus } from "../../../domain/value-objects/task-status.js";
import type { UpdateTaskDto } from "../../dtos/task/update-task.dto.js";
import { TaskNotFoundException } from "../../errors/task/task-not-found.exception.js";
import type { ILogger } from "../../ports/logger.port.js";

export class UpdateTaskUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly logger: ILogger
    ) {}

    async execute(userId: string, taskId: string, input: UpdateTaskDto): Promise<TaskDTO> {
        this.logger.info("Task update attempt", {
            userId,
            taskId,
            title: input.title,
            status: input.status,
        });

        const task = await this.taskRepository.findById(userId, taskId);

        if (!task) {
            throw new TaskNotFoundException();
        };

        if (input.title !== undefined) {
            task.rename(input.title);
        }

        if (input.status !== undefined) {
            task.updateStatus(TaskStatus.fromValue(input.status));
        }

        // if (input.dueDate !== undefined) {
        //     task.updateDueDate(input.dueDate);
        // }

        await this.taskRepository.save(task);

        this.logger.info("Task updated successfully", {
            userId,
            taskId: task.id,
            title: task.title,
            status: task.status.getValue(),
        });

        return task.toPrimitives();
    }
}