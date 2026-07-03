import type { AuthTokenPayload } from "../types/auth-token-payload.js";

export interface ITokenService {
    generate(payload: AuthTokenPayload): string;
    verify(token: string): AuthTokenPayload;
}