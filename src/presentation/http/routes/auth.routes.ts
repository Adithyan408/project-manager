import { Router } from "express";
import type { AuthController } from "../controller/auth.controller.js";
import type { ITokenService } from "../../../application/ports/token.port.js";
import { authenticate } from "../middleware/auth.middleware.js";

export const createAuthRouter = (
  authController: AuthController,
  tokenService: ITokenService
) => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  router.get("/me", authenticate(tokenService), authController.getMe);

  return router;
};