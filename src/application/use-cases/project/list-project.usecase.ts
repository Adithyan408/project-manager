import type { ProjectDTO } from "../../../domain/entities/project.entity.js";
import type { IProjectRepository } from "../../../domain/repositories/project.repository.js";
import type { ILogger } from "../../ports/logger.port.js";

export class ListProjectsUseCase {
    constructor(
        private readonly projectRepository: IProjectRepository,
        private readonly logger: ILogger
    ) {}
    
    async execute(userId: string): Promise<ProjectDTO[]> {
        this.logger.info("List projects attempt", {
            userId,
        });
        const result = await this.projectRepository.findMany(userId);
        this.logger.info("Projects fetched successfully", {
            userId,
            totalProjects: result.length,
        });

        return result.map(project => project.toPrimitives());
    }
}