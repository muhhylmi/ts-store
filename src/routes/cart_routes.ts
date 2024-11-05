// src/routes/helloRoute.ts
import { Router } from 'express';
import { cartHandler, jwtMiddlewareDI } from '../utils/dependency_injection';

const cartRouter = Router();

cartRouter.post('/', jwtMiddlewareDI, cartHandler.createCart.bind(cartHandler));
cartRouter.get('', jwtMiddlewareDI, cartHandler.getCart.bind(cartHandler));
cartRouter.put('/:cartId',jwtMiddlewareDI, cartHandler.updateCart.bind(cartHandler));
cartRouter.get('/:id', jwtMiddlewareDI, cartHandler.getCartDetail.bind(cartHandler));
cartRouter.delete('/:id',jwtMiddlewareDI, cartHandler.deleteCart.bind(cartHandler));
cartRouter.post('/charge', jwtMiddlewareDI, cartHandler.charge.bind(cartHandler));

export default cartRouter;
