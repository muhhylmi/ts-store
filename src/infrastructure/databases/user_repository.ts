import { PrismaClient, User } from "@prisma/client";
import { toUserResponse, UserModelWithoutId, UserResponse } from "../../domain/model/user_model";
import IUserRepo from "../../domain/repositories/user_repo_int";
import { TDatabases } from ".";
import RedisService from "../../utils/redis";

class UserRepo implements IUserRepo {
  private readonly prisma: PrismaClient;
  private readonly redis:  RedisService;

  constructor(db: TDatabases){
    this.prisma = db.getPrismaService().getPrismaClient();
    this.redis =  db.getRedisService();
  }

  async createUser(user: UserModelWithoutId): Promise<UserResponse> {
    const newUser =  await this.prisma.user.create({
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
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true
      }
    });
  }

  async getUser():Promise<UserResponse[]>{
    const users = await this.prisma.user.findMany({
      include: {
        role: true
      },
      where: {
        is_deleted: false
      }
    });
    return users.map(user => {
      return { ...toUserResponse(user), roleName: user.role.role_name };
    });
  }

  async findOne(query: object): Promise<UserResponse|null> {
    const cachedData = await this.redis.get(JSON.stringify(query));
    if (cachedData) {
      const cachedUser: User = JSON.parse(cachedData);
      return toUserResponse(cachedUser);    
    }

    const user = await this.prisma.user.findFirst({
      where: { ...query, is_deleted: false }
    });
    if (!user) {
      return null;
    }
    this.redis.set(JSON.stringify(query), JSON.stringify(user), 60);
    return toUserResponse(user);
  }

}

export default UserRepo;