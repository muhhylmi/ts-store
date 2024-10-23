import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import IItemUsecase from "../usecases/item_usecase_int";
import { CreateItemInput } from "../domain/model/item_model";

export class ItemHandler {
  private itemUsecasee: IItemUsecase;

  constructor(
    itemUsecasee: IItemUsecase
  ) {
    this.itemUsecasee = itemUsecasee;
  }

  async createItem (req: Request, res: Response, next: NextFunction) {
    try {
      const item: CreateItemInput = {
        itemName: req.body.itemName,
        price: req.body.price
      };
      const newItem = await this.itemUsecasee.createItem(item);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };

  async getItem(req: Request, res: Response) {
    const items = await this.itemUsecasee.getItem();
    responseSuccess(res, 200, 'Horray request succesfully created', items);
  };

  async getItemById (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const item = await this.itemUsecasee.getItemById(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async deleteItem (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const item = await this.itemUsecasee.deleteItem(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};
}




