// src/routes/helloRoute.ts
import { Router } from 'express';
import { basicAuthMiddlewareDI, jwtMiddlewareDI, userHandler } from '../utils/dependency_injection';

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
