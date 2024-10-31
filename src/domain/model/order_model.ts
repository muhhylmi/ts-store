import { ChargeResponse } from "./midtrans_model";

export type OrderModel = {
    id: string;
    userId: number;
    status: string;
    createdAt?: Date;
}

export type OrderResponse = ChargeResponse& {
    orderData: OrderModel
}