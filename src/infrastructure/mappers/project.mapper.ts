import { Project } from "../../domain/entities/project.entity.js";
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { prismaClient } from "../database/prisma.clients.js";

type PrismaProjectRow = NonNullable<
    Awaited  <ReturnType<typeof prismaClient.project.findFirst>> 
>;

export class ProjectMapper{
    static toDomainProject(row: PrismaProjectRow): Project {
        return new Project(
            row.id,
            row.title,
            row.userId,
            row.createdAt,
            row.updatedAt
        );
    }

    static toPersistence(project: Project) : Prisma.ProjectUncheckedCreateInput{
        return {
            id: project.id,
            title: project.title,
            userId: project.userId,
            updatedAt: project.updatedAt
        }
    }
}

