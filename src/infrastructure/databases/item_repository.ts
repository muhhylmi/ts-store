import { ItemModel, ItemResponse } from "../../domain/model/item_model";
import IItemRepo from "../../domain/repositories/item_repo_int";
import { HttpException } from "../../utils/exception";
import prisma from "../../utils/prisma";

class ItemRepo implements IItemRepo {
  async createItem(item: ItemModel): Promise<ItemResponse> {
    const newItem =  await prisma.item.create({
      data: {
        item_name: item.item_name,
        price: item.price,
      }
    });
    return {
      item_name: newItem.item_name,
      id: newItem.id,
      price: newItem.id,
      created_at: newItem.createdAt
    };
  }
  async deleteItem(id: number){
    const update = prisma.item.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true
      }
    });
    if (!update) {
      throw new HttpException(409, 'Cannot update item');
    }

    return true;
  }

  async getItem():Promise<object>{
    const items = await prisma.item.findMany({
      where: {
        is_deleted: false
      }
    });
    return items;
  }

  async findOne(query: object): Promise<ItemResponse|null> {
    const item = await prisma.item.findFirst({
      where: { ...query, is_deleted: false }
    });
    if (!item) {
      return null;
    }
    return {
      item_name: item.item_name,
      id: item.id,
      price: item.price,
      is_deleted: item.is_deleted,
      created_at: item.createdAt
    };
  }

}

export default ItemRepo;