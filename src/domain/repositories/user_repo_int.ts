/* eslint-disable no-unused-vars */
import { UserModel } from "../model/user_model";

interface IUserRepo {
    createUser: (user: UserModel) => void;
    deleteUser: VoidFunction;
    getUser: () => Promise<object>;
    findOne: (param:object) => Promise<object|null>;

}
export default IUserRepo;