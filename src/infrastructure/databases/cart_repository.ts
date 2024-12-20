import { PrismaClient } from "@prisma/client";
import { CartModel, CartResponse } from "../../domain/model/cart_model";
import ICartRepo from "../../domain/repositories/cart_repo_int";
import { paymentStatus } from "../../utils/constant";
import { HttpException } from "../../utils/exception";
import { TDatabases } from ".";

class CartRepo implements ICartRepo {
  private readonly prisma: PrismaClient;

  constructor(db: TDatabases){
    this.prisma = db.getPrismaService().getPrismaClient();
  }
  async addCart(cart: CartModel): Promise<CartResponse> {
    const newCart =  await this.prisma.cart.create({
      data: {
        item_id: cart.itemId,
        count: cart.count,
        user_id: cart.userId,
        status: paymentStatus.UNPAID
      }
    });
    return {
      id: newCart.id,
      itemId: newCart.item_id,
      count: newCart.count,
      createdAt: newCart.createdAt
    };
  }
  async deleteCart(id: number){
    const update = this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true
      }
    });
    if (!update) {
      throw new HttpException(409, 'Cannot update cart');
    }

    return true;
  }

  async getCart(query: unknown):Promise<CartResponse[]>{
    const carts = await this.prisma.cart.findMany({
      include: {
        item: true
      },
      where: {
        ...query as object, is_deleted: false
      }
    });
    return carts.map((cart) => ({
      id: cart.id,
      itemId: cart.item_id,
      itemName: cart.item.item_name,
      price: cart.item.price,
      count: cart.count,
      orderId: cart.order_id || "",
      createdAt: cart.createdAt
    }));
  }

  async findOne(query: object): Promise<CartResponse|null> {
    const cart = await this.prisma.cart.findFirst({
      include: { 
        item: true,
      },
      where: { ...query, is_deleted: false }
    });
    if (!cart) {
      return null;
    }
    return {
      id: cart.id,
      itemId: cart.item_id,
      count: cart.count,
      price: cart.item.price,
      itemName: cart.item.item_name,
      isDeleted: cart.is_deleted,
      createdAt: cart.createdAt
    };
  }

  
  async updateOne(id: number, data: CartModel): Promise<CartResponse|null> {
    const cart = await this.prisma.cart.update(
      {
        where:  { id , is_deleted: false },
        data: {
          item_id: data.itemId,
          id: data.cartId,
          count: data.count
        },
        include: {
          item: true
        }
      }
    );
    if (!cart) {
      return null;
    }
    return {
      id: cart.id,
      itemId: cart.item_id,
      count: cart.count,
      price: cart.item.price,
      itemName: cart.item.item_name,
      isDeleted: cart.is_deleted,
      createdAt: cart.createdAt
    };
  }

  async updateMany(ids: number[],  data: object): Promise<number> {
    const result = await this.prisma.cart.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        ...data
      }
    });

    return result.count;
  }


}

export default CartRepo;