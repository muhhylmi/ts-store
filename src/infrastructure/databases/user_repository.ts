import { UserModelWithoutId, UserResponse } from "../../domain/model/user_model";
import IUserRepo from "../../domain/repositories/user_repo_int";
import prisma from "../../utils/prisma";

class UserRepo implements IUserRepo {
  async createUser(user: UserModelWithoutId): Promise<UserResponse> {
    const newUser =  await prisma.user.create({
      data: {
        username: user.username,
        roleId: user.roleId,
        password: user.password
      }
    });
    return {
      id: newUser.id,
      username: newUser.username,
      roleId: newUser.roleId,
      created_at: newUser.createdAt
    };
  }
  async deleteUser(id: number){
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true
      }
    });
  }

  async getUser():Promise<UserResponse[]>{
    const users = await prisma.user.findMany({
      include: {
        role: true
      },
      where: {
        is_deleted: false
      }
    });
    return users.map(user => {
      return {
        id: user.id,
        roleName: user.role.role_name,
        roleId: user.roleId,
        username: user.username,
        created_at: user.createdAt,
        password: user.password
      };
    });
  }

  async findOne(query: object): Promise<UserResponse|null> {
    const user = await prisma.user.findFirst({
      where: { ...query, is_deleted: false }
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
      password: user.password,
      is_deleted: user.is_deleted,
      created_at: user.createdAt
    };
  }

}

export default UserRepo;