import { LoginRequest, UserModel, UserRequest } from "../domain/model/user_model";
import IUserRepo from "../domain/repositories/user_repo_int";
import config from "../infrastructure/config";
import { HttpException } from "../utils/exception";
import logger from "../utils/logger";
import IUserUsecase from "./user_usercase_int";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class UserUsecase implements IUserUsecase {
  private readonly repository: IUserRepo;
  constructor(repository: IUserRepo, ) {
    this.repository = repository;
  }

  async createUser(user: UserRequest){
    const input: UserModel = {
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
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
    if (newUser.password) {
      delete newUser.password;
    }
    return newUser;
  }

  async getUser(): Promise<object> {
    const users = await this.repository.getUser();
    return users;
  }

  async getUserById(id: number): Promise<object | null>{
    const user = await this.repository.findOne({
      id: id,
    });
    if (!user) {
      throw new HttpException(400, 'User Not Found');
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (user) {
      return this.repository.deleteUser(id);
    }
  }

  async login (req: LoginRequest): Promise<object> {
    try {
      const user = await this.repository.findOne({
        username: req.username
      });

      if (!user || !user.password) {
        throw new HttpException(400, "Credential is not valid");
      }
    
      const passwordValid = await bcrypt.compare(req.password, user.password);
      if (!passwordValid) {
        throw new HttpException(400, "Credential is not valid");
      }
            
      const token = jwt.sign({
        username: user.username,
        userId: user.id,
        roleId: user.roleId
      }, config.JWTPRIVATEKEY, { expiresIn: '1h'});
    
      return {
        accessToken: token,
        userId: user.id, 
        username: user.username
      };   
    } catch (error) {
      throw new HttpException(400, "Something error: " + error);
    }
        
        
  }
}


export default UserUsecase;