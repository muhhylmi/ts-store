import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import UserUsecase from "../use_case/user_usecase";
import { UserRequest } from "../model/user_model";
import { HttpException } from "../utils/exception";

const userUsecase:UserUsecase = new UserUsecase(prisma);
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
      res.json(newUser);
    } catch (error) {
      next(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
  const users = await userUsecase.getUser();
  res.json(users);
};