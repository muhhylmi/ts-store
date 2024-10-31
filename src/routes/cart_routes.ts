// src/routes/helloRoute.ts
import { Router } from 'express';
import { jwtAuthMiddleware, validate, validateParams, validateRequest } from '../utils/middlewares';
import IUserRepo from '../domain/repositories/user_repo_int';
import UserRepo from '../infrastructure/databases/user_repository';
import ICartRepo from '../domain/repositories/cart_repo_int';
import CartRepo from '../infrastructure/databases/cart_repository';
import ICartUsecase from '../usecases/cart_usecase_int';
import CartUsecase from '../usecases/cart_usecase';
import { CartHanlder } from '../handlers/cart_handler';
import { chargeSchema, createCartSchema, newUpdateCartSchema } from '../domain/model/cart_model';
import { getItemSchema } from '../domain/model/item_model';
import IPaymentRepo from '../domain/repositories/payment_int';
import { Midtrans } from '../infrastructure/payments/midtrans';
import IOrderRepo from '../domain/repositories/order_repo_int';
import OrderRepo from '../infrastructure/databases/order_repository';
import { Logging } from '../utils/logger';

// Dependency Injection

const repository: ICartRepo = new CartRepo();
const userRepo: IUserRepo = new UserRepo();
const payment: IPaymentRepo = new Midtrans();
const orderRepo: IOrderRepo = new OrderRepo();
const logger: Logging = new Logging();
const cartUsecase:ICartUsecase = new CartUsecase(repository, payment, orderRepo, logger);
const cartHanlder = new CartHanlder(cartUsecase);

const cartRouter = Router();

cartRouter.post('/', 
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo),
  validate(createCartSchema),
  (req, res, next) => cartHanlder.createCart(req, res, next)
);
cartRouter.get('', 
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo),
  (req, res) => cartHanlder.getCart(req, res)
);
cartRouter.put('/:cartId',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateRequest(newUpdateCartSchema),
  (req, res, next) => cartHanlder.updateCart(req, res, next)
);
cartRouter.get('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getItemSchema),
  (req, res, next) => cartHanlder.getCartDetail(req, res, next)
);
cartRouter.delete('/:id',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validateParams(getItemSchema),
  (req, res, next) => cartHanlder.deleteCart(req, res, next)
);
cartRouter.post('/charge',
  (req, res, next) => jwtAuthMiddleware(req, res, next, userRepo), 
  validate(chargeSchema),
  (req, res, next) => cartHanlder.charge(req, res, next)
);

export default cartRouter;
