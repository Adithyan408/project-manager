import express from "express";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.config.js"; 


import { LoginUseCase } from "./application/use-cases/auth/login.usecase.js";
import { RegisterUseCase } from "./application/use-cases/auth/register.usecase.js";
import { CreateProjectUseCase } from "./application/use-cases/project/create-project.usecase.js";
import { ListProjectsUseCase } from "./application/use-cases/project/list-project.usecase.js"; 
import { UpdateProjectUseCase } from "./application/use-cases/project/update-project.usecase.js"; 
import { GetProjectUseCase } from "./application/use-cases/project/get-project.usecase.js";
import { DeleteProjectUseCase } from "./application/use-cases/project/delete-project.usecase.js"; 
import { ListTasksUseCase } from "./application/use-cases/task/list-task.usecase.js"; 
import { CreateTaskUseCase } from "./application/use-cases/task/create-task.usecase.js"; 
import { UpdateTaskUseCase } from "./application/use-cases/task/update-task.usecase.js";
import { GetTaskUseCase } from "./application/use-cases/task/get-task.usecase.js"; 
import { DeleteTaskUseCase } from "./application/use-cases/task/delete-task.usecase.js";

import { PasswordHashService } from "./infrastructure/auth/bcrypt-password.service.js";
import { jwtTokenService } from "./infrastructure/auth/jwt-token.service.js";
import { PrismaUserRepository } from "./infrastructure/repositories/prisma-user.repository.js"; 
import { PrismaProjectRepository } from "./infrastructure/repositories/prisma-project.repository.js";
import { PrismaTaskRepository } from "./infrastructure/repositories/prisma-task.repository.js";

import { errorHandlerMiddleware } from "./presentation/http/middleware/error-handle.middleware.js"; 
import { createAuthRouter } from "./presentation/http/routes/auth.routes.js";
import { createProjectRouter } from "./presentation/http/routes/project.routes.js";
import { createTaskRouter } from "./presentation/http/routes/task.routes.js";
import { AuthController } from "./presentation/http/controller/auth.controller.js"; 
import { ProjectController } from "./presentation/http/controller/project.controller.js"; 
import { TaskController } from "./presentation/http/controller/task.controller.js"; 

import { pinoLogger } from "./infrastructure/logger/pino.logger.js"; 

const app = express();

const httpLogger = pinoHttp({
    logger: pinoLogger
})

app.use(express.json())
app.use(httpLogger);


const userRepository = new PrismaUserRepository();
const passwordHasher = new PasswordHashService();
const tokenService = new jwtTokenService();

const projectRepository = new PrismaProjectRepository();
const taskRepository = new PrismaTaskRepository();


const registerUseCase = new RegisterUseCase(userRepository, passwordHasher, pinoLogger);
const loginUseCase = new LoginUseCase(
  userRepository,
  passwordHasher,
  tokenService,
  pinoLogger
);

const createProjectUseCase = new CreateProjectUseCase(projectRepository, pinoLogger);
const listProjectsUseCase = new ListProjectsUseCase(projectRepository, pinoLogger);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository, pinoLogger);
const getProjectUseCase = new GetProjectUseCase(projectRepository, pinoLogger);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository, pinoLogger);

const listTasksUseCase = new ListTasksUseCase(taskRepository, pinoLogger);
const createTaskUseCase = new CreateTaskUseCase(taskRepository, pinoLogger);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository, pinoLogger);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository, pinoLogger);
const getTaskUseCase = new GetTaskUseCase(taskRepository, pinoLogger);



const authController = new AuthController(registerUseCase, loginUseCase);

const projectController = new ProjectController(
  createProjectUseCase,
  listProjectsUseCase,
  updateProjectUseCase,
  deleteProjectUseCase,
  getProjectUseCase
);

const taskController = new TaskController(
  createTaskUseCase,
  listTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  getTaskUseCase
);


const authRouter = createAuthRouter(authController, tokenService);
const projectRouter = createProjectRouter(
  projectController,
  taskController,
  tokenService
);
const taskRouter = createTaskRouter(taskController, tokenService);


app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);


app.use(errorHandlerMiddleware());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});