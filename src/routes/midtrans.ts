import { Router } from 'express';
import { cartHandler } from '../utils/dependency_injection';

const midtransRouter = Router();

midtransRouter.post('/callback', cartHandler.updateStatusOrder.bind(cartHandler));

export default midtransRouter;
