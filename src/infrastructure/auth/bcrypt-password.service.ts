import type { IPasswordHasher } from "../../application/ports/password-hasher.port.ts";
import bcrypt from "bcrypt";

export class PasswordHashService implements IPasswordHasher{
    async hash(password: string): Promise <string> {
        return bcrypt.hash(password, 10)
    }

    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}