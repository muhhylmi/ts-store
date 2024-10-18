/* eslint-disable no-unused-vars */
import { UserModel, UserResponse } from "../model/user_model";

interface IUserRepo {
    createUser: (user: UserModel) => Promise<UserResponse>;
    deleteUser: (id: number) => void;
    getUser: () => Promise<object>;
    findOne: (param:object) => Promise<UserResponse|null>;

}
export default IUserRepo;