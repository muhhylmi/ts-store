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
}

export interface UserResponse {
    username?: string;
    password?: string;
    roleId?: number;
    id?: number;
    is_deleted?: boolean;
    created_at?: Date;
}