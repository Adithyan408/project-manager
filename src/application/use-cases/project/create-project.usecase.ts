import type { CreateProjectDto } from "../../dtos/project/create-project.dto.js";
import type { Logger } from "../../ports/logger.port.js";
import { Project, type ProjectDTO } from "../../../domain/entities/project.entity.js";
import type { ProjectRepository } from "../../../domain/repositories/project.repository.js";


export class CreateProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly logger: Logger
    ) {}

    async execute(input: CreateProjectDto, userId: string): Promise<ProjectDTO> {
        this.logger.info("Project creation attempt", {
            userId,
            title: input.title,
        });

        const project = Project.create({
            title: input.title,
            userId,
        });

        await this.projectRepository.save(project);

        this.logger.info("Project created successfully", {
            projectId: project.id,
            userId,
            title: project.title,
        });

        return project.toPrimitives();
    }
}