import { User } from '@prisma/client';
import { z } from 'zod';
import { fileSchema } from './item_model';
export interface UserRequest {
    username: string;
    password: string;
    roleId: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface UserModel {
    username: string;
    password: string;
    roleId: number;
    image?: string;
    id: number;
}
export type UserModelWithoutId = Omit<UserModel, "id">;

export interface UserResponse {
    username?: string;
    password?: string;
    roleId?: number;
    roleName?: string;
    image?: string;
    id?: number;
    is_deleted?: boolean;
    created_at?: Date;
}

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 6 characters long"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 6 characters long"),
  roleId: z.string().min(1, "roleId cannot be empty").transform(Number),
  file: fileSchema
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const getUserSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id must be a number").transform(Number)
});
export type GetUserInput = z.infer<typeof getUserSchema>;

export const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    roleId: user.roleId,
    password: user.password,
    image: user.image || "",
    is_deleted: user.is_deleted,
    created_at: user.createdAt
  };
};