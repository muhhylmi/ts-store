// src/routes/helloRoute.ts
import { Router } from 'express';
import { RoleHandler } from '../handlers/role_handler';
import IRoleRepo from "../domain/repositories/role_repo_int";
import RoleUsecase from '../usecases/role_usecase';
import RoleRepo from '../infrastructure/databases/role_repository';
import IRoleUsecase from '../usecases/role_usecase_int';
import { basicAuthMiddleware, jwtAuthMiddleware, validate, validateParams } from '../utils/middlewares';
import IUserRepo from '../domain/repositories/user_repo_int';
import UserRepo from '../infrastructure/databases/user_repository';
import { createRoleSchema, getRoleSchema } from '../domain/model/role_model';

// Dependency Injection

const repository: IRoleRepo = new RoleRepo();
const userRepo: IUserRepo = new UserRepo();
const roleUsecase:IRoleUsecase = new RoleUsecase(repository);
const userHandler = new RoleHandler(roleUsecase);

const roleRouter = Router();

roleRouter.post('/', 
  basicAuthMiddleware, 
  validate(createRoleSchema),
  (req, res, next) => userHandler.createRole(req, res, next)
);
roleRouter.get('', 
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo),
  (req, res) => userHandler.getRole(req, res)
);
roleRouter.get('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getRoleSchema),
  (req, res, next) => userHandler.getRoleById(req, res, next)
);
roleRouter.delete('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getRoleSchema),
  (req, res, next) => userHandler.deleteRole(req, res, next)
);

export default roleRouter;
