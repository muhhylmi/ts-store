import { z } from 'zod';

export interface ItemResponse {
    item_name: string;
    price: number;
    id: number;
    created_at?: Date;
    is_deleted?: boolean;
}

export interface ItemModel {
    item_name: string;
    price: number;
}

export const createItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  price: z.number().gt(1, "Price cannot be empty")
});
export type CreateItemInput = z.infer<typeof createItemSchema>;

export const getItemSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id must be a number").transform(Number)
});
export type GetItemInput =z.infer<typeof getItemSchema>;