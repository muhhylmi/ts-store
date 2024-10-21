/* eslint-disable no-unused-vars */
import { CreateRoleInput } from "../domain/model/role_model";

export default interface IRoleUsecase {
    createRole: (user: CreateRoleInput) => void;
    getRole: () => Promise<object>;
    getRoleById: (id: number) => Promise<object | null>;
    deleteRole: (id: number) => void;
// eslint-disable-next-line semi
}