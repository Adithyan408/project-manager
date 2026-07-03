import type { CreateProjectDto } from "../../dtos/project/create-project.dto.js";
import type { ILogger } from "../../ports/logger.port.js";
import { Project, type ProjectDTO } from "../../../domain/entities/project.entity.js";
import type { IProjectRepository } from "../../../domain/repositories/project.repository.js";


export class CreateProjectUseCase {
    constructor(
        private readonly projectRepository: IProjectRepository,
        private readonly logger: ILogger
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