/* eslint-disable no-unused-vars */
import { ChargeInput, CreateCartInput, UpdateCartInput } from "../domain/model/cart_model";
import { OrderModel, OrderResponse } from "../domain/model/order_model";
import { UserModel } from "../domain/model/user_model";

export default interface ICartUsecase {
    createCart: (cart: CreateCartInput, user: UserModel) => void;
    getCart: () => Promise<object>;
    getCartDetail: (id: number) => Promise<object | null>;
    deleteCart: (id: number) => void;
    updateCart: (cart: UpdateCartInput, user: UserModel) => void
    cartCharge: (carts: ChargeInput, user: UserModel) => Promise<OrderResponse>
    updateStatusOrder: (order: Omit<OrderModel, 'userId'>) => Promise<OrderModel>
// eslint-disable-next-line semi
}