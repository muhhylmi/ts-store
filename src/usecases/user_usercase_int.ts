/* eslint-disable no-unused-vars */
import { UserRequest } from "../domain/model/user_model";

export default interface IUserUsecase {
    createUser: (user: UserRequest) => void;
    getUser: () => Promise<object>;
    getUserById: (id: number) => Promise<object | null>;
// eslint-disable-next-line semi
}