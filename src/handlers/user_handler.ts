import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../domain/model/user_model";
import { HttpException } from "../utils/exception";
import { responseSuccess } from "../utils/wrapper";
import IUserUsecase from "../usecases/user_usercase_int";

export class UserHandler {
  private userUsecase: IUserUsecase;

  constructor(
    userUsecase: IUserUsecase
  ) {
    this.userUsecase = userUsecase;
  }

  async createUser (req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserRequest = {
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
      };
      if (!user.roleId) {
        throw new HttpException(404,'Validation Error');
      }
      const newUser = await this.userUsecase.createUser(user);
      responseSuccess(res, 201, "Horray user success created", newUser);
    } catch (error) {
      next(error);
    }
};

async getUser(req: Request, res: Response) {
  const users = await this.userUsecase.getUser();
  responseSuccess(res, 200, 'Horray request succesfully created', users);
};

async getUserById (req: Request, res: Response, next: NextFunction) {
  try {
    const id: number = Number(req.params.id);
    const user = await this.userUsecase.getUserById(id);
    responseSuccess(res, 200, 'Hooray Request successfully created', user);
  } catch (error) {
    next(error);
  }};
}


