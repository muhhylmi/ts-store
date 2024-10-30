import { z } from 'zod';
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
    id: number;
}
export type UserModelWithoutId = Omit<UserModel, "id">;

export interface UserResponse {
    username?: string;
    password?: string;
    roleId?: number;
    id?: number;
    is_deleted?: boolean;
    created_at?: Date;
}

export const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 6 characters long"),
  roleId: z.number().min(1, "RoleId is invalid"),
});

export const getUserSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id must be a number")
});