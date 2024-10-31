/* eslint-disable no-unused-vars */
import { OrderModel } from "../model/order_model";

interface IOrderRepo {
    create: (data: OrderModel) => Promise<OrderModel>;

}
export default IOrderRepo;