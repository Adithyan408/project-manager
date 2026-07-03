import type { IProjectRepository } from "../../../domain/repositories/project.repository.js";
import type { DeleteProjectDto } from "../../dtos/project/delete-project.dto.js";
import { ProjectNotFoundException } from "../../errors/project/project-not-found.exception.js";
import type { ILogger } from "../../ports/logger.port.js";



export class DeleteProjectUseCase {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly logger: ILogger
  ) {}

  async execute(userId: string, input: DeleteProjectDto): Promise<void> {
    this.logger.info("Project deletion attempt", {
      userId,
      projectId: input.id,
    });

    const project = await this.projectRepository.findById(userId, input.id);

    if (!project) {
      throw new ProjectNotFoundException();
    }

    await this.projectRepository.delete(userId, input.id);
    this.logger.info("Project deleted successfully", {
      userId,
      projectId: input.id,
    });
  }
}