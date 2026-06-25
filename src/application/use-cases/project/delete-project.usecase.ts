import type { ProjectRepository } from "../../../domain/repositories/project.repository.js";
import type { DeleteProjectDto } from "../../dtos/project/delete-project.dto.js";
import { ProjectNotFoundException } from "../../errors/project/project-not-found.exception.js";
import type { Logger } from "../../ports/logger.port.js";



export class DeleteProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger
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