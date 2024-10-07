import { PrismaClient } from "@prisma/client";
import IUser from "../model/user_interface";
import logger from "../utils/logger";
import { IResponse } from "../model/web_interface";

class UserUsecase {
    private readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(user: IUser): Promise<IResponse>{
        logger.info("create user", user);
        const { username, password, roleId } = user;
        try {
          const newUser =  await this.prisma.user.create({
            data: { username, password, roleId}
          });
          return {
            error: null, // Tidak ada error, jadi null
            data: {
              username: newUser.username,
              id: newUser.id,
              roleId: newUser.roleId
            }
          };
        } catch (error) {
            return {
                error: new Error(error + "Cannot create user"),
                data: null // Data tidak berhasil dibuat, jadi null
              };        
            }
    }

    async getUser(): Promise<object> {
        const users = await this.prisma.user.findMany();
        return users;
    }
}


export default UserUsecase;