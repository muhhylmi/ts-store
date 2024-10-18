// src/routes/helloRoute.ts
import { Router } from 'express';
import { UserHandler } from '../handlers/user_handler';
import IUserRepo from "../domain/repositories/user_repo_int";
import UserUsecase from '../usecases/user_usecase';
import UserRepo from '../infrastructure/databases/user_repository';
import IUserUsecase from '../usecases/user_usercase_int';

// Dependency Injection
const repository: IUserRepo = new UserRepo();
const userUsecase:IUserUsecase = new UserUsecase(repository);
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
userRouter.delete('/:id', (req, res, next) => userHandler.deleteUser(req, res, next));

export default userRouter;
