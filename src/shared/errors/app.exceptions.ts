import type { ErrorCode } from "./error-code.js";
import { ErrorMessages } from "./error-messages.js";

export class AppException extends Error{
    constructor(
        readonly code: ErrorCode,
        readonly statusCode: number,
        message ?: string
    ){
        super(message ?? ErrorMessages[code])
    }
}