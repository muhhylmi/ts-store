// src/routes/helloRoute.ts
import { Router } from 'express';
import { jwtAuthMiddleware, validate, validateParams } from '../utils/middlewares';
import IUserRepo from '../domain/repositories/user_repo_int';
import UserRepo from '../infrastructure/databases/user_repository';
import { createItemSchema, getItemSchema } from '../domain/model/item_model';
import IItemRepo from '../domain/repositories/item_repo_int';
import ItemRepo from '../infrastructure/databases/item_repository';
import ItemUsecase from '../usecases/item_usecase';
import IItemUsecase from '../usecases/item_usecase_int';
import { ItemHandler } from '../handlers/item_handler';

// Dependency Injection

const repository: IItemRepo = new ItemRepo();
const userRepo: IUserRepo = new UserRepo();
const itemUsecase:IItemUsecase = new ItemUsecase(repository);
const itemHandler = new ItemHandler(itemUsecase);

const itemRouter = Router();

itemRouter.post('/', 
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo),
  validate(createItemSchema),
  (req, res, next) => itemHandler.createItem(req, res, next)
);
itemRouter.get('', 
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo),
  (req, res) => itemHandler.getItem(req, res)
);
itemRouter.get('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getItemSchema),
  (req, res, next) => itemHandler.getItemById(req, res, next)
);
itemRouter.delete('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getItemSchema),
  (req, res, next) => itemHandler.deleteItem(req, res, next)
);

export default itemRouter;
