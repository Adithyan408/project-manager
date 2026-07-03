import type { RegisterDto } from "../../dtos/auth/login.dto.js";
import { UserExistsException } from "../../errors/auth/user-exists.exception.js";
import type { ILogger } from "../../ports/logger.port.js";
import type { IPasswordHasher } from "../../ports/password-hasher.port.js";
import { User, type UserDTO } from "../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../domain/repositories/user.repository.js";

export class RegisterUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly logger: ILogger
    ) {}

    private async ensureUserDoesNotExist(email: string): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new UserExistsException();
        }
    }

    async execute(input: RegisterDto): Promise<UserDTO> {
        this.logger.info("Registration attempt", {
            email: input.email,
        });
        await this.ensureUserDoesNotExist(input.email);

        const passwordHash = await this.passwordHasher.hash(input.password);

        const user = User.create({
            fullName: input.fullName,
            email: input.email,
            passwordHash: passwordHash,
        });

        await this.userRepository.save(user);

        this.logger.info("Registration successful", {
            userId: user.id,
            email: user.email,
        });

        return user.toPrimitives();
    }
}