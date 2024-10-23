/* eslint-disable no-unused-vars */
import { ItemModel, ItemResponse } from "../model/item_model";

interface IItemRepo {
    createItem: (role: ItemModel) => Promise<ItemResponse>;
    deleteItem: (id: number) => Promise<boolean>;
    getItem: () => Promise<object>;
    findOne: (param:object) => Promise<ItemResponse|null>;
}
export default IItemRepo;