import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import ICartUsecase from "../usecases/cart_usecase_int";
import { ChargeInput, CreateCartInput, UpdateCartInput } from "../domain/model/cart_model";
import { UserModel } from "../domain/model/user_model";

export class CartHanlder {
  private cartUsecase: ICartUsecase;

  constructor(
    cartUsecase: ICartUsecase
  ) {
    this.cartUsecase = cartUsecase;
  }

  async createCart (req: Request, res: Response, next: NextFunction) {
    try {
      const item: CreateCartInput = {
        itemId: req.body.itemId,
        count: req.body.count,
      };
      const user: UserModel = {
        id: Number(req.body.user.id),
        username: req.body.user.username,
        password: "",
        roleId: req.body.user.roleId
      };
      const newItem = await this.cartUsecase.createCart(item, user);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };

  async updateCart (req: Request, res: Response, next: NextFunction) {
    try {
      const item: UpdateCartInput = {
        itemId: req.body.itemId,
        count: req.body.count,
        cartId: Number(req.params.cartId)
      };
      const user: UserModel = {
        id: Number(req.body.user.id),
        username: req.body.user.username,
        password: "",
        roleId: req.body.user.roleId
      };

      const newItem = await this.cartUsecase.updateCart(item, user);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };


  async getCart(req: Request, res: Response) {
    const items = await this.cartUsecase.getCart();
    responseSuccess(res, 200, 'Horray request succesfully created', items);
  };

  async getCartDetail (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const item = await this.cartUsecase.getCartDetail(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async deleteCart (req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const item = await this.cartUsecase.deleteCart(id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async charge (req: Request, res: Response, next: NextFunction) {
    try {
      const item: ChargeInput = {
        cartIds: req.body.cartIds,
        bank: req.body.bank,
      };
      const user: UserModel = {
        id: Number(req.body.user.id),
        username: req.body.user.username,
        password: "",
        roleId: req.body.user.roleId
      };
      const newItem = await this.cartUsecase.cartCharge(item, user);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };
    
}




