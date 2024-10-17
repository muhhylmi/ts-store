/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";
import { UserModel } from "../model/user_model";

interface IUserRepo {
    readonly prisma: PrismaClient;

    createUser: (user: UserModel) => void;
    deleteUser: VoidFunction;
    getUser: () => Promise<object>;
    findOne: (param:object) => Promise<object|null>;

}
export default IUserRepo;