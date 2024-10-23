/* eslint-disable no-unused-vars */
import { CreateItemInput } from "../domain/model/item_model";

export default interface IItemUsecase {
    createItem: (user: CreateItemInput) => void;
    getItem: () => Promise<object>;
    getItemById: (id: number) => Promise<object | null>;
    deleteItem: (id: number) => void;
// eslint-disable-next-line semi
}