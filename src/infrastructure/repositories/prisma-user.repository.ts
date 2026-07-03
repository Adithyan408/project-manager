import { User } from "../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../domain/repositories/user.repository.js";
import { Prisma } from "@prisma/client";
import { prismaClient } from "../database/prisma.clients.js";

type PrismaUserRow = NonNullable<
    Awaited<ReturnType<typeof prismaClient.user.findUnique>>
>;

const toDomainUser = (row: PrismaUserRow): User => {
    return new User(
        row.id,
        row.fullName,
        row.email,
        row.passwordHash,
        row.createdAt,
        row.updatedAt,
    );
};

const toPersistence = (user: User) : Prisma.UserUncheckedCreateInput => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    passwordHash: user.passwordHashValue,
    updatedAt: user.updatedAt
});

export class PrismaUserRepository implements IUserRepository {
    async save(user: User): Promise<void> {
        await prismaClient.user.upsert({
            where: {id: user.id},
            update: toPersistence(user),
            create: {
                ...toPersistence(user),
                createdAt: user.createdAt,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await prismaClient.user.findUnique({
            where: {email: email.trim().toLowerCase() },
        });
        return row ? toDomainUser(row) : null;
    }

    async findById(id: string): Promise<User | null> {
        const row = await prismaClient.user.findUnique({
            where: {id},
        });
        return row ? toDomainUser(row) : null;
    }
}