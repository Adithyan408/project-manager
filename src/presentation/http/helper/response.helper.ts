import type { Response } from "express";
import { HttpStatusCode } from "../../../shared/constants/http-status.js";
import type { ApiResponse } from "../../types/api.types.js";

type API_RESPONSE_CODES = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export class ResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message: string,
    code: API_RESPONSE_CODES = HttpStatusCode.OK,
  ): Response<ApiResponse<T>> {
    return res.status(code).json({
      success: true,
      data,
      message,
      status: code,
    });
  }
}