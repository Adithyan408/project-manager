import type { TaskDTO } from "../../../domain/entities/task.entity.js";
import type { ITaskRepository } from "../../../domain/repositories/task.repository.js";
import { TaskNotFoundException } from "../../errors/task/task-not-found.exception.js";
import type { ILogger } from "../../ports/logger.port.js";

export class GetTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly logger: ILogger
  ) {}

  async execute(userId: string, taskId: string): Promise<TaskDTO> {
    this.logger.info("Get task attempt", {
      userId,
      taskId,
    });

    const task = await this.taskRepository.findById(userId, taskId);

    if (!task) {
      throw new TaskNotFoundException();
    }

    this.logger.info("Task fetched successfully", {
      userId,
      taskId: task.id,
      title: task.title,
      status: task.status.getValue(),
    });

    return task.toPrimitives();
  }
}