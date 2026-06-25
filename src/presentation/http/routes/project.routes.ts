import { Router } from "express";
import type { TokenService } from "../../../application/ports/token.port.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { ProjectController } from "../controller/project.controller.js";
import type { TaskController } from "../controller/task.controller.js";

export const createProjectRouter = (
  projectController: ProjectController,
  taskController: TaskController,
  tokenService: TokenService
) => {
  const router = Router();

  router.post("/", authenticate(tokenService), projectController.create);
  router.post("/:id/tasks", authenticate(tokenService), taskController.create);

  router.get("/", authenticate(tokenService), projectController.list);
  router.get("/:id", authenticate(tokenService), projectController.get);
  router.get("/:id/tasks", authenticate(tokenService), taskController.list);

  router.patch("/:id", authenticate(tokenService), projectController.update);

  router.delete("/:id", authenticate(tokenService), projectController.delete);

  return router;
};