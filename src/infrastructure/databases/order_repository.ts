import { OrderModel } from "../../domain/model/order_model";
import IOrderRepo from "../../domain/repositories/order_repo_int";
import prisma from "../../utils/prisma";

class OrderRepo implements IOrderRepo {
  async create(order: OrderModel): Promise<OrderModel> {
    const data = await prisma.order.create({
      data: {
        id: order.id,
        user_id: order.userId,
        status: order.status,
      }
    });
    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      createdAt: data.createdAt  
    };
  }

  async updateStatus(orderId: string, status: string): Promise<OrderModel> {
    const data = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: status
      }
    });
    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      createdAt: data.createdAt  
    }; 
  }

  async findOne(query: object): Promise<OrderModel | null> {
    const data = await prisma.order.findFirst({
      where: {
        ...query
      }
    });
    if (!data) {
      return null;
    }
    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      createdAt: data.createdAt  
    }; 
  }

  async createTransaction<T>(promises: Promise<T>[]): Promise<T[]> {
    const results: T[] = [];
  
    await prisma.$transaction(async () => {
      results.push(...await Promise.all(promises));
    });
  
    return results;
  }
}

export default OrderRepo;