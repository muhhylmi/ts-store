import { UserModel } from "../../domain/model/user_model";
import IUserRepo from "../../domain/repositories/user_repo_int";
import prisma from "../../utils/prisma";

class UserRepo implements IUserRepo {
    async createUser(user: UserModel) {
        const newUser =  await prisma.user.create({
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
        const users = await prisma.user.findMany();
        return users;
    }

    async findOne(query: object): Promise<object|null> {
        const user = await prisma.user.findFirst({
            where: query
        });
        return user;
    }

}

export default UserRepo;