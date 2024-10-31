import { CreateRoleInput, RoleModel } from "../domain/model/role_model";
import IRoleRepo from "../domain/repositories/role_repo_int";
import { HttpException } from "../utils/exception";
import { Logging } from "../utils/logger";
import IRoleUsecase from "./role_usecase_int";


class RoleUsecase implements IRoleUsecase {
  private readonly repository: IRoleRepo;
  private readonly logger: Logging;
  constructor(repository: IRoleRepo, logger: Logging) {
    this.repository = repository;
    this.logger = logger;
  }

  async createRole(role: CreateRoleInput){
    const input: RoleModel = {
      rolename: role.roleName,
      visibility: role.visibility
    };
    const existRole = await this.repository.findOne({
      role_name: role.roleName
    });
    if (existRole) {
      this.logger.logError('rolename already exists');
      throw new HttpException(400,'rolename already exists');
    }
    const newRole =  await this.repository.createRole(input);

    return newRole;
  }

  async getRole(): Promise<object> {
    const roles = await this.repository.getRole();
    return roles;
  }

  async getRoleById(id: number): Promise<object | null>{
    const user = await this.repository.findOne({
      id: id,
    });
    if (!user) {
      throw new HttpException(400, 'Role Not Found');
    }
    return user;
  }

  async deleteRole(id: number) {
    const role = await this.getRoleById(id);
    if (role) {
      return this.repository.deleteRole(id);
    }
  }
}


export default RoleUsecase;