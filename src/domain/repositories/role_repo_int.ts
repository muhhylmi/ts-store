/* eslint-disable no-unused-vars */
import { RoleModel, RoleResponse } from "../model/role_model";

interface IRoleRepo {
    createRole: (role: RoleModel) => Promise<RoleResponse>;
    deleteRole: (id: number) => void;
    getRole: () => Promise<object>;
    findOne: (param:object) => Promise<RoleResponse|null>;
}
export default IRoleRepo;