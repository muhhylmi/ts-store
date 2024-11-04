import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import IRoleUsecase from "../usecases/role_usecase_int";
import { CreateRoleInput, createRoleSchema, GetRoleInput, getRoleSchema } from "../domain/model/role_model";
import { validateHandlers } from "../utils/middlewares";
import { HttpException } from "../utils/exception";

export class RoleHandler {
  private roleUsecase: IRoleUsecase;

  constructor(
    roleUsecase: IRoleUsecase
  ) {
    this.roleUsecase = roleUsecase;
  }

  async createRole (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(createRoleSchema, req.body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as CreateRoleInput;  
      const newRole = await this.roleUsecase.createRole(input);
      responseSuccess(res, 201, "Horray role success created", newRole);
    } catch (error) {
      next(error);
    }
  };

  async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.roleUsecase.getRole();
      responseSuccess(res, 200, 'Horray request succesfully created', roles);
    } catch (error) {
      next(error);
    }
  };

  async getRoleById (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getRoleSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetRoleInput;
      const role = await this.roleUsecase.getRoleById(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', role);
    } catch (error) {
      next(error);
    }};

  async deleteRole (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getRoleSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetRoleInput;
      const role = await this.roleUsecase.deleteRole(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', role);
    } catch (error) {
      next(error);
    }};
}




