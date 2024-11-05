import { PrismaClient } from "@prisma/client";
import { OrderModel } from "../../../domain/model/order_model";
import IOrderRepo from "../../../domain/repositories/order_repo_int";
import { TDatabases } from "..";

class OrderRepo implements IOrderRepo {
  private readonly prisma: PrismaClient;
  constructor(db: TDatabases){
    this.prisma = db.getPrismaClient();
  }
  async create(order: OrderModel): Promise<OrderModel> {
    const data = await this.prisma.order.create({
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
    const data = await this.prisma.order.update({
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
    const data = await this.prisma.order.findFirst({
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
  
    await this.prisma.$transaction(async () => {
      results.push(...await Promise.all(promises));
    });
  
    return results;
  }
}

export default OrderRepo;