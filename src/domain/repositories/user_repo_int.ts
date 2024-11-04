/* eslint-disable no-unused-vars */
import { UserModelWithoutId, UserResponse } from "../model/user_model";

interface IUserRepo {
    createUser: (user: UserModelWithoutId) => Promise<UserResponse>;
    deleteUser: (id: number) => void;
    getUser: () => Promise<UserResponse[]>;
    findOne: (param:object) => Promise<UserResponse|null>;

}
export default IUserRepo;