import { CreateItemInput, ItemModel } from "../domain/model/item_model";
import IItemRepo from "../domain/repositories/item_repo_int";
import { HttpException } from "../utils/exception";
import logger from "../utils/logger";
import IItemUsecase from "./item_usecase_int";


class ItemUsecase implements IItemUsecase {
  private readonly repository: IItemRepo;
  constructor(repository: IItemRepo) {
    this.repository = repository;
  }

  async createItem(item: CreateItemInput){
    const input: ItemModel = {
      item_name: item.itemName,
      price: item.price
    };
    const existRole = await this.repository.findOne({
      item_name: item.itemName
    });
    if (existRole) {
      logger.error('item name already exists');
      throw new HttpException(400,'item name already exists');
    }
    const newRole =  await this.repository.createItem(input);

    return newRole;
  }

  async getItem(): Promise<object> {
    const items = await this.repository.getItem();
    return items;
  }

  async getItemById(id: number): Promise<object | null>{
    const item = await this.repository.findOne({
      id: id,
    });
    if (!item) {
      throw new HttpException(400, 'Item Not Found');
    }
    return item;
  }

  async deleteItem(id: number) {
    const item = await this.getItemById(id);
    if (!item) {
      throw new HttpException(400, 'Item Not Found');
    }
    return this.repository.deleteItem(id);

  }
}


export default ItemUsecase;