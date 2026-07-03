import type { LoginDto } from "../../dtos/auth/register.dto.js";
import { InvalidCredentialsException } from "../../errors/auth/invalid-credentials.exception.js";
import type { ILogger } from "../../ports/logger.port.js";
import type { IPasswordHasher } from "../../ports/password-hasher.port.js";
import type { ITokenService } from "../../ports/token.port.js";
import type { User } from "../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../domain/repositories/user.repository.js";


export class LoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenService: ITokenService,
        private readonly logger: ILogger,
    ) {}

    private async getUserOrFail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsException();
        }

        return user;
    }

    private async validatePassword(password: string, user: User) {
        const isValid = await this.passwordHasher.compare(
            password,
            user.passwordHashValue
        );

        if (!isValid) {
            throw new InvalidCredentialsException();
        }
    }

    private generateToken(user: User): string {
        return this.tokenService.generate({
            sub: user.id,
            email: user.email
        });
    }

    async execute(input: LoginDto): Promise<{ accessToken: string }> {
        this.logger.info("Login attempt", {
            email: input.email,
        });

        const user = await this.getUserOrFail(input.email);

        await this.validatePassword(input.password, user);

        const accessToken = this.generateToken(user);

        this.logger.info("Login successful", {
            userId: user.id,
            email: user.email,
        });

        return { accessToken };
    }
}