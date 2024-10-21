import { RoleModel, RoleResponse } from "../../domain/model/role_model";
import IRoleRepo from "../../domain/repositories/role_repo_int";
import prisma from "../../utils/prisma";

class RoleRepo implements IRoleRepo {
    async createRole(role: RoleModel): Promise<RoleResponse> {
        const newRole =  await prisma.role.create({
            data: {
                role_name: role.rolename,
                id: role.roleId,
                visibiltity: role.visibility
            }
        });
        return {
            rolename: newRole.role_name,
            visibility: newRole.visibiltity,
            roleId: newRole.id,
            created_at: newRole.createdAt
        };
    }
    async deleteRole(id: number){
        return prisma.role.update({
            where: {
                id: id,
            },
            data: {
                is_deleted: true
            }
        });
    }

    async getRole():Promise<object>{
        const roles = await prisma.role.findMany({
            where: {
                is_deleted: false
            }
        });
        return roles;
    }

    async findOne(query: object): Promise<RoleResponse|null> {
        const role = await prisma.role.findFirst({
            where: { ...query, is_deleted: false }
        });
        if (!role) {
            return null;
        }
        return {
            rolename: role.role_name,
            roleId: role.id,
            visibility: role.visibiltity,
            is_deleted: role.is_deleted,
            created_at: role.createdAt
        };
    }

}

export default RoleRepo;