import { z } from 'zod';

export interface RoleRequest {
    rolename: string;
    visibility: string[];
    roleId: number;
}

export interface RoleModel {
    rolename: string;
    visibility: string[];
    roleId?: number;
}

export interface RoleResponse {
    rolename: string;
    visibility: string[];
    roleId: number;
    is_deleted?: boolean;
    created_at?: Date;
}

export const createRoleSchema = z.object({
  roleName: z.string().min(1, "Name is required"),
  visibility: z.array(z.string()).nonempty("Visibility cannot be empty")
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;

export const getRoleSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id must be a number")
});