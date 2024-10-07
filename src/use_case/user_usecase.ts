import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../model/user_model";

class UserUsecase {
    private readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(user: UserRequest){
        const { username, password, roleId } = user;
        const newUser =  await this.prisma.user.create({
          data: { username, password, roleId}
        });
        return newUser;
    }

    async getUser(): Promise<object> {
        const users = await this.prisma.user.findMany();
        return users;
    }
}


export default UserUsecase;