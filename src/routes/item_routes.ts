import { Router } from 'express';
import { itemHandler, jwtMiddlewareDI } from '../utils/dependency_injection';
import upload from '../utils/multer';

const itemRouter = Router();

itemRouter.post('/', jwtMiddlewareDI, upload.single('image'), itemHandler.createItem.bind(itemHandler));
itemRouter.get('/:id', jwtMiddlewareDI, itemHandler.getItemById.bind(itemHandler));
itemRouter.get('', jwtMiddlewareDI, itemHandler.getItem.bind(itemHandler));
itemRouter.delete('/:id', jwtMiddlewareDI, itemHandler.deleteItem.bind(itemHandler));

export default itemRouter;





