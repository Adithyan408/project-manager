import type { Request, Response } from "express";
import { GetProjectDtoSchema } from "../../../application/dtos/project/get-project.dto.js";
import { CreateTaskDtoSchema } from "../../../application/dtos/task/create-task.dto.js";
import { ResponseHelper } from "../helper/response.helper.js";
import { TASK_CONSTANTS } from "../../constants/task.constants.js";
import { GetTaskDtoSchema } from "../../../application/dtos/task/get-task.dto.js";
import { UpdateTaskDtoSchema } from "../../../application/dtos/task/update-task.dto.js";
import type { CreateTaskUseCase } from "../../../application/use-cases/task/create-task.usecase.js";
import type { ListTasksUseCase } from "../../../application/use-cases/task/list-task.usecase.js";
import type { UpdateTaskUseCase } from "../../../application/use-cases/task/update-task.usecase.js";
import type { DeleteTaskUseCase } from "../../../application/use-cases/task/delete-task.usecase.js";
import type { GetTaskUseCase } from "../../../application/use-cases/task/get-task.usecase.js";



export class TaskController {
  constructor(
    private _createTaskUseCase: CreateTaskUseCase,
    private _listTasksUseCase: ListTasksUseCase,
    private _updateTaskUseCase: UpdateTaskUseCase,
    private _deleteTaskUseCase: DeleteTaskUseCase,
    private _getTaskUseCase: GetTaskUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    const params = GetProjectDtoSchema.parse(req.params);
    const dto = CreateTaskDtoSchema.parse(req.body);
    const task = await this._createTaskUseCase.execute(
      dto,
      req.user!.sub,
      params.id
    );
    ResponseHelper.success(
      res,
      task,
      TASK_CONSTANTS.MESSAGES.TASK_CREATED_SUCCESSFULLY,
      TASK_CONSTANTS.CODES.OK
    );
  };

  list = async (req: Request, res: Response) => {
    const params = GetProjectDtoSchema.parse(req.params);
    const tasks = await this._listTasksUseCase.execute(
      req.user!.sub,
      params.id
    );
    ResponseHelper.success(
      res,
      tasks,
      TASK_CONSTANTS.MESSAGES.TASKS_FETCHED_SUCCESSFULLY,
      TASK_CONSTANTS.CODES.OK
    );
  };

  get = async (req: Request, res: Response) => {
    const params = GetTaskDtoSchema.parse(req.params);
    const task = await this._getTaskUseCase.execute(req.user!.sub, params.id);
    ResponseHelper.success(
      res,
      task,
      TASK_CONSTANTS.MESSAGES.TASK_FETCHED_SUCCESSFULLY,
      TASK_CONSTANTS.CODES.OK
    );
  };

  update = async (req: Request, res: Response) => {
    const params = GetTaskDtoSchema.parse(req.params);
    const dto = UpdateTaskDtoSchema.parse(req.body);
    const task = await this._updateTaskUseCase.execute(
      req.user!.sub,
      params.id,
      dto
    );

    ResponseHelper.success(
      res,
      task,
      TASK_CONSTANTS.MESSAGES.TASK_UPDATED_SUCCESSFULLY,
      TASK_CONSTANTS.CODES.OK
    );
  };

  delete = async (req: Request, res: Response) => {
    const params = GetTaskDtoSchema.parse(req.params);
    await this._deleteTaskUseCase.execute(req.user!.sub, params.id);
    res.status(TASK_CONSTANTS.CODES.NO_CONTENT).send();
  };
}