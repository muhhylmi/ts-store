// src/routes/helloRoute.ts
import { Router } from 'express';
import { createUser, getUser, getUserById } from '../handler/user_handler';

const userRouter = Router();


userRouter.post('/', createUser);

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
userRouter.get('', getUser);
userRouter.get('/:id', getUserById);

export default userRouter;
