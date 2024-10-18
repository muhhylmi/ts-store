import { UserModel } from "../model/user_model";
import IUserRepo from "./user_repo_int";
import { PrismaClient } from "@prisma/client";

class UserRepo implements IUserRepo {
    readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
       this.prisma = prisma;
    }
    async createUser(user: UserModel) {
        const newUser =  await this.prisma.user.create({
            data: {
                username: user.username,
                roleId: user.roleId,
                password: user.password
            }
        });
        return newUser;
    }
    async deleteUser(){

    }

    async getUser():Promise<object>{
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findOne(query: object): Promise<object|null> {
        const user = await this.prisma.user.findFirst({
            where: query
        });
        return user;
    }

}

export default UserRepo;