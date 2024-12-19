import { UserResponse } from "../../domain/model/user_model";
import IUserRepo from "../../domain/repositories/user_repo_int";
import { userRepo } from "../../utils/dependency_injection";
import { HttpException } from "../../utils/exception";

class UserResolvers {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public get resolvers() {
    return {
      Query: {
        getUsers: this.getUsers.bind(this),
      },
      Mutation: {
        createUser: this.createUser.bind(this),
      },
    };
  }

  private async getUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.userRepo.getUser();
      return users.map((user) => ({
        id: user.id,
        username: user.username,
        image: user.image,
        created_at: user.created_at,
        roleId: user.roleId,
        roleName: user.roleName
      }));
    } catch (error) {
      throw new HttpException(400, 'Failed to fetch users' + error);
    }
  }

  private async createUser (
    _: unknown,
    { username, password, roleId }: { username: string; password: string; roleId: number }
  ): Promise<UserResponse> {
    const userData = { username, password, roleId };
    try {
      return await this.userRepo.createUser (userData);
    } catch (error) {
      throw new HttpException(400, 'Failed to create user: ' + error);
    }
  }
}

// Create an instance of UserResolvers
const userResolversInstance = new UserResolvers(userRepo);
export const userResolvers = userResolversInstance.resolvers;