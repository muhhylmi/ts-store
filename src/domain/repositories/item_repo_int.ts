/* eslint-disable no-unused-vars */
import { FileModel, ItemModel, ItemResponse } from "../model/item_model";

interface IItemRepo {
    createItem: (item: ItemModel) => Promise<ItemResponse>;
    deleteItem: (id: number) => Promise<boolean>;
    getItem: () => Promise<object>;
    findOne: (param:object) => Promise<ItemResponse|null>;
    uploadItemFile: (file: FileModel, type: string,folder: string) => Promise<string | undefined>;
}
export default IItemRepo;