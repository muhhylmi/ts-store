import { Router } from 'express';
import ICartRepo from '../domain/repositories/cart_repo_int';
import CartRepo from '../infrastructure/databases/cart_repository';
import ICartUsecase from '../usecases/cart_usecase_int';
import CartUsecase from '../usecases/cart_usecase';
import { CartHanlder } from '../handlers/cart_handler';
import IPaymentRepo from '../domain/repositories/payment_int';
import { Midtrans } from '../infrastructure/payments/midtrans';
import IOrderRepo from '../domain/repositories/order_repo_int';
import OrderRepo from '../infrastructure/databases/order_repository';

const midtransRouter = Router();

const repository: ICartRepo = new CartRepo();
const payment: IPaymentRepo = new Midtrans();
const orderRepo: IOrderRepo = new OrderRepo();
const cartUsecase:ICartUsecase = new CartUsecase(repository, payment, orderRepo);
const cartHanlder = new CartHanlder(cartUsecase);

midtransRouter.post('/callback',
  (req, res, next) => cartHanlder.updateStatusOrder(req, res, next)
);

export default midtransRouter;
