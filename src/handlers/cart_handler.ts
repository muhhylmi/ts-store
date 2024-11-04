import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/wrapper";
import ICartUsecase from "../usecases/cart_usecase_int";
import { ChargeInput, chargeSchema, CreateCartInput, createCartSchema, UpdateCartInput, updateCartSchema } from "../domain/model/cart_model";
import { UserModel } from "../domain/model/user_model";
import { OrderModel } from "../domain/model/order_model";
import { validateHandlers } from "../utils/middlewares";
import { HttpException } from "../utils/exception";
import { GetItemInput, getItemSchema } from "../domain/model/item_model";

export class CartHanlder {
  private cartUsecase: ICartUsecase;

  constructor(
    cartUsecase: ICartUsecase
  ) {
    this.cartUsecase = cartUsecase;
  }

  async createCart (req: Request, res: Response, next: NextFunction) {
    try {
      const { user, ...body } = req.body;
      const { success, errors, data } = validateHandlers(createCartSchema, body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as  CreateCartInput;
      const userInput =  user as UserModel;
      const newCart = await this.cartUsecase.createCart(input, userInput);
      responseSuccess(res, 201, "Horray request success created", newCart);
    } catch (error) {
      next(error);
    }
  };

  async updateCart (req: Request, res: Response, next: NextFunction) {
    try {
      const { user, ...body } = req.body;
      const { success, errors, data } = validateHandlers(updateCartSchema, body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as  UpdateCartInput;
      const userInput =  user as UserModel;
      const newItem = await this.cartUsecase.updateCart(input, userInput);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };


  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.cartUsecase.getCart();
      responseSuccess(res, 200, 'Horray request succesfully created', items);
    } catch (error) {
      next(error);
    }
  };

  async getCartDetail (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getItemSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetItemInput;      
      const item = await this.cartUsecase.getCartDetail(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async deleteCart (req: Request, res: Response, next: NextFunction) {
    try {
      const { success, errors, data } = validateHandlers(getItemSchema, req.params);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as GetItemInput;            
      const item = await this.cartUsecase.deleteCart(input.id);
      responseSuccess(res, 200, 'Hooray Request successfully created', item);
    } catch (error) {
      next(error);
    }};

  async charge (req: Request, res: Response, next: NextFunction) {
    try {
      const { user, ...body } = req.body;
      const { success, errors, data } = validateHandlers(chargeSchema, body);
      if (!success) {
        throw new HttpException(400, errors || "Validation Error");
      }
      const input = data as ChargeInput;      
      const userInput =  user as UserModel;
      const newItem = await this.cartUsecase.cartCharge(input, userInput);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };

  async updateStatusOrder (req: Request, res: Response, next: NextFunction) {
    try {
      const order: Omit<OrderModel, 'userId'> = {
        id: req.body.order_id,
        status: req.body.transaction_status,
      };
      const newItem = await this.cartUsecase.updateStatusOrder(order);
      responseSuccess(res, 201, "Horray request success created", newItem);
    } catch (error) {
      next(error);
    }
  };
    
}




