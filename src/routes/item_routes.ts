import { Router } from 'express';
import { itemHandler, jwtMiddlewareDI } from '../utils/dependency_injection';

const itemRouter = Router();

itemRouter.post('/', jwtMiddlewareDI, itemHandler.createItem.bind(itemHandler));
itemRouter.get('/:id', jwtMiddlewareDI, itemHandler.getItemById.bind(itemHandler));
itemRouter.get('', jwtMiddlewareDI, itemHandler.getItem.bind(itemHandler));
itemRouter.delete('/:id', jwtMiddlewareDI, itemHandler.deleteItem.bind(itemHandler));

export default itemRouter;





