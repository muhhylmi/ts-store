import { z } from 'zod';

export interface CartResponse {
    id: number;
    itemId: number;
    itemName?: string;
    count: number;
    price?: number;
    createdAt?: Date;
    isDeleted?: boolean;
}
export interface CartModel {
    itemId: number;
    count: number;
    userId: number; 
    price?: number;
    cartId?: number;
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

export const newUpdateCartSchema = z.object({
  params: getCartSchema,
  body: updateCartSchema,
});