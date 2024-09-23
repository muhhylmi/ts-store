import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: { username, password, roleId: 1}
      });
      res.json(newUser);
    } catch (error) {
      
      res.status(400).json({ error: error + 'Unable to create user' });
    }
};

export const getUser = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};