import { z } from 'zod';

export interface ItemResponse {
    item_name: string;
    price: number;
    id: number;
    image?: string;
    created_at?: Date;
    is_deleted?: boolean;
}

export interface ItemModel {
    item_name: string;
    price: number;
    image: string;
}

export interface FileModel {
  originalname: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

const fileSchema = z.object({
  originalname: z.string().regex(/\.(jpg|jpeg|png|pdf)$/i, {
    message: 'Only JPG, PNG, or PDF files are allowed',
  }),
  mimetype: z.string().refine((mimetype) => ['image/jpeg', 'image/png', 'application/pdf'].includes(mimetype), {
    message: 'Invalid file type',
  }),
  size: z.number().max(5 * 1024 * 1024, {
    message: 'File size must not exceed 5MB',
  }),
  path: z.string(),
  filename: z.string()
});

export const createItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  price: z.string().min(1, "Price cannot be empty").transform(Number),
  file: fileSchema
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

export const getItemSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id must be a number").transform(Number)
});
export type GetItemInput =z.infer<typeof getItemSchema>;