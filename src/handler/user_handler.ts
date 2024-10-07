import { Request, Response } from "express";
import prisma from "../utils/prisma";
import UserUsecase from "../use_case/user_usecase";
import IUser from "../model/user_interface";

const userUsecase:UserUsecase = new UserUsecase(prisma);
export const createUser = async (req: Request, res: Response) => {
    try {
      const user:IUser = {
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
      };
      const newUser = await userUsecase.createUser(user);
      if (newUser.data == null) {
        return res.status(400).json(newUser);
      }
      return res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: error + 'Unable to create user' });
    }
};

export const getUser = async (req: Request, res: Response) => {
  const users = await userUsecase.getUser();
  res.json(users);
};