"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
class UserUsecase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("create user", user);
            const { username, password, roleId } = user;
            try {
                const newUser = yield this.prisma.user.create({
                    data: { username, password, roleId }
                });
                return newUser;
            }
            catch (error) {
                return error + "Unable to create user";
            }
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany();
            return users;
        });
    }
}
exports.default = UserUsecase;
