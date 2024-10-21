import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import IRoleUsecase from "../usecases/role_usecase_int";
import { CreateRoleInput } from "../domain/model/role_model";

export class RoleHandler {
  private roleUsecase: IRoleUsecase;

  constructor(
    roleUsecase: IRoleUsecase
  ) {
    this.roleUsecase = roleUsecase;
  }

  async createRole (req: Request, res: Response, next: NextFunction) {
    try {
      const role: CreateRoleInput = {
        roleName: req.body.roleName,
        visibility: req.body.visibility
      };
      const newRole = await this.roleUsecase.createRole(role);
      responseSuccess(res, 201, "Horray role success created", newRole);
    } catch (error) {
      next(error);
    }
  };

  async getRole(req: Request, res: Response) {
    const roles = await this.roleUsecase.getRole();
    responseSuccess(res, 200, 'Horray request succesfully created', roles);
  };

  async getRoleById (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const role = await this.roleUsecase.getRoleById(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', role);
    } catch (error) {
      next(error);
    }};

  async deleteRole (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const role = await this.roleUsecase.deleteRole(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', role);
    } catch (error) {
      next(error);
    }};
}




