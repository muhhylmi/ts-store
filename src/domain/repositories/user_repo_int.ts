/* eslint-disable no-unused-vars */
import { FileModel } from "../model/item_model";
import { UserModelWithoutId, UserResponse } from "../model/user_model";

interface IUserRepo {
    createUser: (user: UserModelWithoutId) => Promise<UserResponse>;
    deleteUser: (id: number) => void;
    getUser: () => Promise<UserResponse[]>;
    findOne: (param:object) => Promise<UserResponse|null>;
    uploadItemFile: (file: FileModel, type: string,folder: string) => Promise<string | undefined>;
}
export default IUserRepo;