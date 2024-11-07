import { PrismaClient } from "@prisma/client";
import { RoleModel, RoleResponse } from "../../domain/model/role_model";
import IRoleRepo from "../../domain/repositories/role_repo_int";
import { HttpException } from "../../utils/exception";
import { TDatabases } from ".";

class RoleRepo implements IRoleRepo {
  private readonly prisma: PrismaClient;
  constructor(db: TDatabases){
    this.prisma = db.getPrismaService().getPrismaClient();
  }
  async createRole(role: RoleModel): Promise<RoleResponse> {
    const newRole =  await this.prisma.role.create({
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
    const update = this.prisma.role.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true
      }
    });
    if (!update) {
      throw new HttpException(409, 'Cannot update role');
    }

    return true;
  }

  async getRole():Promise<object>{
    const roles = await this.prisma.role.findMany({
      where: {
        is_deleted: false
      }
    });
    return roles;
  }

  async findOne(query: object): Promise<RoleResponse|null> {
    const role = await this.prisma.role.findFirst({
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