import type { ProjectDTO } from "../../../domain/entities/project.entity.js";
import type { ProjectRepository } from "../../../domain/repositories/project.repository.js";
import type { GetProjectDto } from "../../dtos/project/get-project.dto.js";
import { ProjectNotFoundException } from "../../errors/project/project-not-found.exception.js";
import type { Logger } from "../../ports/logger.port.js";


export class GetProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger
  ) {}

  async execute(userId: string, input: GetProjectDto): Promise<ProjectDTO> {
    this.logger.info("Get project attempt", {
      userId,
      projectId: input.id,
    });

    const project = await this.projectRepository.findById(userId, input.id);

    if (!project) {
      throw new ProjectNotFoundException();
    }

    this.logger.info("Project fetched successfully", {
      userId,
      projectId: project.id,
      title: project.title,
    });

    return project.toPrimitives();
  }
}