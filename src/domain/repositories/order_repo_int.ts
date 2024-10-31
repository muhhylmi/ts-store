/* eslint-disable no-unused-vars */
import { OrderModel } from "../model/order_model";

interface IOrderRepo {
    create: (data: OrderModel) => Promise<OrderModel>;
    updateStatus: (orderId:  string, status: string) => Promise<OrderModel>;
    findOne: (query: object) => Promise<OrderModel | null>
}
export default IOrderRepo;