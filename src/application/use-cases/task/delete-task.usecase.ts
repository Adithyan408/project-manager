import type { TaskRepository } from "../../../domain/repositories/task.repository.js";
import { TaskNotFoundException } from "../../errors/task/task-not-found.exception.js";
import type { Logger } from "../../ports/logger.port.js";

export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly logger: Logger
  ) {}

  async execute(userId: string, taskId: string): Promise<void> {
    this.logger.info("Task deletion attempt", {
      userId,
      taskId,
    });

    const task = await this.taskRepository.findById(userId, taskId);

    if (!task) {
      throw new TaskNotFoundException();
    }

    await this.taskRepository.delete(userId, taskId);
    this.logger.info("Task deleted successfully", {
      userId,
      taskId,
    });
  }
}