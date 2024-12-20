import { z } from 'zod';
import { ItemModel } from './item_model';
import { bankType } from '../../utils/constant';

export interface CartResponse {
    id: number;
    itemId: number;
    itemName?: string;
    count: number;
    price?: number;
    createdAt?: Date;
    orderId?: string;
    isDeleted?: boolean;
}
export interface CartModel {
    itemId: number;
    count: number;
    userId: number; 
    price?: number;
    cartId?: number;
}

export interface ChargeResponse {
    status: string;
    itemDetails: Partial<ItemModel>[];
    totalPrice: number;
}

export const createCartSchema = z.object({
  itemId: z.number().min(1, "ItemId is required"),
  count: z.number().min(1, "Count is required"),
});
export type CreateCartInput = z.infer<typeof createCartSchema>;

export const updateCartSchema = z.object({
  itemId: z.number().min(1, "ItemId is required"),
  count: z.number().min(1, "Count is required"),
});
export const getCartSchema = z.object({
  cartId: z.string().min(1, "ItemId is required").transform(Number),
});

export type UpdateCartInput = z.infer<typeof updateCartSchema> & {
    cartId: number;
};

export const chargeSchema = z.object({
  cartIds: z.array(z.number()).min(1),
  bank: z.enum([bankType.bca, bankType.bri, bankType.permata])
});
export type ChargeInput = z.infer<typeof chargeSchema>

export const newUpdateCartSchema = z.object({
  params: getCartSchema,
  body: updateCartSchema,
});