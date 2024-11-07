import { NextFunction, Request, Response } from "express";
import { CreateUserInput, createUserSchema, GetUserInput, getUserSchema, LoginInput, loginSchema } from "../domain/model/user_model";
import { responseSuccess } from "../utils/wrapper";
import IUserUsecase from "../usecases/user_usercase_int";
import { validateHandlers } from "../utils/middlewares";
import { HttpException } from "../utils/exception";

export class UserHandler {
  private userUsecase: IUserUsecase;

  constructor(
    userUsecase: IUserUsecase
  ) {
    this.userUsecase = userUsecase;
  }

  async createUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(createUserSchema, req.body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const user = data as CreateUserInput;
      const newUser = await this.userUsecase.createUser(user);
      responseSuccess(res, 201, "Horray user success created", newUser);
    } catch (error) {
      next(error);
    }
  };

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userUsecase.getUser();
      responseSuccess(res, 200, 'Horray request succesfully created', users);
    } catch (error) {
      next(error);
    }
  };

  async getUserById (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getUserSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }      
      const input = data as GetUserInput;
      const user = await this.userUsecase.getUserById(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', user);
    } catch (error) {
      next(error);
    }};

  async deleteUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getUserSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }      
      const input = data as GetUserInput;      
      const user = await this.userUsecase.deleteUser(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', user);
    } catch (error) {
      next(error);
    }};

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(loginSchema, req.body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }    
      const input =  data as LoginInput;
      const result = await this.userUsecase.login(input);
      responseSuccess(res, 200, 'Hooray Request successfully created', result);
    } catch (error) {
      next(error);
    }};
}




