import { CreateItemInput, ItemModel } from "../domain/model/item_model";
import IItemRepo from "../domain/repositories/item_repo_int";
import { HttpException } from "../utils/exception";
import { Logging } from "../utils/logger";
import IItemUsecase from "./item_usecase_int";
import fs from 'fs';


class ItemUsecase implements IItemUsecase {
  private readonly repository: IItemRepo;
  private readonly logger: Logging;
  constructor(repository: IItemRepo, logger: Logging) {
    this.repository = repository;
    this.logger = logger;
  }

  async createItem(item: CreateItemInput){
    const existItem = await this.repository.findOne({
      item_name: item.itemName
    });
    if (existItem) {
      fs.unlinkSync(item.file.path);
      this.logger.logError("ctx", 'item name already exists');
      throw new HttpException(400,'item name already exists');
    }
    try {
      const result = await this.repository.uploadItemFile(item.file, 'images', 'items');
      if (!result) {
        this.logger.logError("usecase.item_usecase", 'item file upload failed');
        throw new HttpException(409, "item file upload failed");
      }
      const input: ItemModel = {
        item_name: item.itemName,
        price: item.price,
        image: result
      };
  
      const newItem =  await this.repository.createItem(input);
      return newItem;
    } catch (error) {
      this.logger.logError("usecase.item_usecase", error as string);
      fs.unlinkSync(item.file.path);
      throw new HttpException(409, error as string);
    }
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