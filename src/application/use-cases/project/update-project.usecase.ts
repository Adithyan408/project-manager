import type { ProjectDTO } from "../../../domain/entities/project.entity.js";
import type { ProjectRepository } from "../../../domain/repositories/project.repository.js";
import type { UpdateProjectDto } from "../../dtos/project/update-project.dto.js";
import { ProjectNotFoundException } from "../../errors/project/project-not-found.exception.js";
import type { Logger } from "../../ports/logger.port.js";

export class UpdateProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly logger: Logger
    ) {}

    async execute(userId: string, projectId: string, input: UpdateProjectDto): Promise<ProjectDTO> {
        this.logger.info("Project update attempt", {
            userId,
            projectId,
            title: input.title,
        });

        const project = await this.projectRepository.findById(userId, projectId);

        if (!project) {
            throw new ProjectNotFoundException();
        };

        project.rename(input.title);

        await this.projectRepository.save(project);

        this.logger.info("Project updated successfully", {
            userId,
            projectId: project.id,
            title: project.title,
        });

        return project.toPrimitives();
    }
}