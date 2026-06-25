import { HttpStatusCode } from "../../../shared/constants/http-status.js";
import { AppException } from "../../../shared/errors/app.exceptions.js";
import { ErrorCodes } from "../../../shared/errors/error-code.js";

export class UnauthorizedException extends AppException {
  constructor() {
    super(ErrorCodes.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
  }
}