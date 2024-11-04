// src/routes/helloRoute.ts
import { Router } from 'express';
import { UserHandler } from '../handlers/user_handler';
import IUserRepo from "../domain/repositories/user_repo_int";
import UserUsecase from '../usecases/user_usecase';
import UserRepo from '../infrastructure/databases/user_repository';
import IUserUsecase from '../usecases/user_usercase_int';
import { Logging } from '../utils/logger';
import { basicAuthMiddlewareDI, jwtMiddlewareDI } from './dependency_injection';

// Dependency Injection
const repository: IUserRepo = new UserRepo();
const logger: Logging = new Logging();
const userUsecase:IUserUsecase = new UserUsecase(repository, logger);
const userHandler = new UserHandler(userUsecase);

const userRouter = Router();

userRouter.post('/', basicAuthMiddlewareDI, userHandler.createUser.bind(userHandler));
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
userRouter.get('', jwtMiddlewareDI, userHandler.getUser.bind(userHandler));
userRouter.get('/:id', jwtMiddlewareDI,  userHandler.getUserById.bind(userHandler));
userRouter.delete('/:id',jwtMiddlewareDI, userHandler.deleteUser.bind(userHandler));
userRouter.post('/login', basicAuthMiddlewareDI, userHandler.login.bind(userHandler));


export default userRouter;
