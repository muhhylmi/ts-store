/* eslint-disable no-unused-vars */
import { CreateUserInput, LoginRequest } from "../domain/model/user_model";

export default interface IUserUsecase {
    createUser: (user: CreateUserInput) => void;
    getUser: () => Promise<object>;
    getUserById: (id: number) => Promise<object | null>;
    deleteUser: (id: number) => void;
    login: (login: LoginRequest) => Promise<object>
// eslint-disable-next-line semi
}