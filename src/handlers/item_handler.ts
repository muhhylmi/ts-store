import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import IItemUsecase from "../usecases/item_usecase_int";
import { CreateItemInput, createItemSchema, GetItemInput, getItemSchema } from "../domain/model/item_model";
import { validateHandlers } from "../utils/middlewares";
import { HttpException } from "../utils/exception";

export class ItemHandler {
  private itemUsecase: IItemUsecase;

  constructor(
    itemUsecase: IItemUsecase
  ) {
    this.itemUsecase = itemUsecase;
  }

  async createItem (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(createItemSchema, {...req.body, file: req.file });
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const  item = data as CreateItemInput;
      const newItem = await this.itemUsecase.createItem(item);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.itemUsecase.getItem();
      responseSuccess(res, 200, 'Horray request succesfully created', items);
    } catch (error) {
      next(error);
    }
  };

  async getItemById (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getItemSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetItemInput;
      const item = await this.itemUsecase.getItemById(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async deleteItem (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getItemSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetItemInput;      
      const item = await this.itemUsecase.deleteItem(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};
}




