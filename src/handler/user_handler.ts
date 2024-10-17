import { NextFunction, Request, Response } from "express";
import UserUsecase from "../use_case/user_usecase";
import { UserRequest } from "../model/user_model";
import { HttpException } from "../utils/exception";
import UserRepo from "../repositories/user_repo";
import prisma from "../utils/prisma";
import IUserRepo from "../repositories/user_repo_int";
import { responseSuccess } from "../utils/wrapper";

const repository: IUserRepo = new UserRepo(prisma);
const userUsecase:UserUsecase = new UserUsecase(repository);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserRequest = {
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
      };
      if (!user.roleId) {
        throw new HttpException(404,'Validation Error');
      }
      const newUser = await userUsecase.createUser(user);
      responseSuccess(res, 201, "Horray user success created", newUser);
    } catch (error) {
      next(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
  const users = await userUsecase.getUser();
  responseSuccess(res, 200, 'Horray request succesfully created', users);
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = Number(req.params.id);
    const user = await userUsecase.getUserById(id);
    responseSuccess(res, 200, 'Hooray Request successfully created', user);
  } catch (error) {
    next(error);
  }

};