// src/routes/helloRoute.ts
import { Router } from 'express';
import { UserHandler } from '../handler/user_handler';
import UserRepo from "../repositories/user_repo";
import prisma from "../utils/prisma";
import IUserRepo from "../repositories/user_repo_int";
import UserUsecase from '../use_case/user_usecase';

// Dependency Injection
const repository: IUserRepo = new UserRepo(prisma);
const userUsecase:UserUsecase = new UserUsecase(repository);
const userHandler = new UserHandler(userUsecase);

const userRouter = Router();


userRouter.post('/', (req, res, next) => userHandler.createUser(req, res, next));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns all users
 *     description: Responds all users.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user44
 */
userRouter.get('', (req, res) => userHandler.getUser(req, res));
userRouter.get('/:id', (req, res, next) => userHandler.getUserById(req, res, next));

export default userRouter;
