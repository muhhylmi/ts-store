// src/routes/helloRoute.ts
import { Router } from 'express';
import { basicAuthMiddlewareDI, jwtMiddlewareDI, roleHandler } from './dependency_injection';

// Dependency Injection


const roleRouter = Router();

roleRouter.post('/', basicAuthMiddlewareDI, roleHandler.createRole.bind(roleHandler));
roleRouter.get('', jwtMiddlewareDI, roleHandler.getRole.bind(roleHandler));
roleRouter.get('/:id', jwtMiddlewareDI, roleHandler.getRoleById.bind(roleHandler));
roleRouter.delete('/:id', jwtMiddlewareDI,  roleHandler.deleteRole.bind(roleHandler));

export default roleRouter;
