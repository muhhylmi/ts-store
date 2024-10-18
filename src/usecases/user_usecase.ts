import { UserModel, UserRequest } from "../domain/model/user_model";
import IUserRepo from "../domain/repositories/user_repo_int";
import { HttpException } from "../utils/exception";
import logger from "../utils/logger";
import IUserUsecase from "./user_usercase_int";

class UserUsecase implements IUserUsecase {
    private readonly repository: IUserRepo;
    constructor(repository: IUserRepo, ) {
        this.repository = repository;
    }

    async createUser(user: UserRequest){
        const input: UserModel = {
            username: user.username,
            password: user.password,
            roleId: user.roleId
        };
        const existUser = await this.repository.findOne({
            username: user.username
        });
        if (existUser) {
            logger.error('Username already exists');
            throw new HttpException(400,'Username already exists');
        }
        const newUser =  await this.repository.createUser(input);
        return newUser;
    }

    async getUser(): Promise<object> {
        const users = await this.repository.getUser();
        return users;
    }

    async getUserById(id: number): Promise<object | null>{
        const user = await this.repository.findOne({
            id: id
        });
        if (!user) {
            throw new HttpException(400, 'User Not Found');
        }
        return user;
    }
}


export default UserUsecase;