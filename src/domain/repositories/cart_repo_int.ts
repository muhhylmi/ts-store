/* eslint-disable no-unused-vars */
import { CartModel, CartResponse } from "../model/cart_model";

interface ICartRepo {
    addCart: (role: CartModel) => Promise<CartResponse>;
    deleteCart: (id: number) => Promise<boolean>;
    getCart: (query: unknown) => Promise<CartResponse[]>;
    findOne: (param:object) => Promise<CartResponse|null>;
    updateOne: (id: number, data: CartModel) => Promise<CartResponse|null> 
    updateMany: (ids: number[], data: object) => Promise<number> 
}
export default ICartRepo;