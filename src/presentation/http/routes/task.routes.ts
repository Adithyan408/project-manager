import type { ITokenService } from "../../../application/ports/token.port.js";
import { TaskController } from "../controller/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { Router } from "express";


export const createTaskRouter = (
  taskController: TaskController,
  tokenService: ITokenService
) => {
  const router = Router();

  router.get("/:id", authenticate(tokenService), taskController.get);

  router.patch("/:id", authenticate(tokenService), taskController.update);

  router.delete("/:id", authenticate(tokenService), taskController.delete);

  return router;
};