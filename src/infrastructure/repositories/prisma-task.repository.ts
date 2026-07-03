import { Task } from "../../domain/entities/task.entity.js";
import type { ITaskRepository } from "../../domain/repositories/task.repository.js";
import { PrismaClient } from "@prisma/client";
import { TaskMapper } from "../mappers/task.mapper.js";
import { prismaClient } from "../database/prisma.clients.js";

export class PrismaTaskRepository implements ITaskRepository{
    async save(entity: Task): Promise<void> {
        await prismaClient.task.upsert({
            where: {id: entity.id},
            update: TaskMapper.toPersistence(entity),
            create: {
                ...TaskMapper.toPersistence(entity),
                createdAt: entity.createdAt,
            },
        });
    }

    async findById(userId: string, id: string): Promise<Task | null> {
        const task = await prismaClient.task.findFirst({
            where: {id, userId},
        });
        return task ? TaskMapper.toDoaminTask(task) : null
    }

    async findByProject(userId: string, projectId: string): Promise<Task[]> {
        const tasks = await prismaClient.task.findMany({
            where: {userId, projectId },
            orderBy: {createdAt: "desc"},
        });
        return tasks.map(TaskMapper.toDoaminTask);
    }

    async delete(userId: string, id: string): Promise<void> {
        await prismaClient.task.deleteMany({where: {id, userId}});
    }
}