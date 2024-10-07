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
exports.getUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const user_usecase_1 = __importDefault(require("../use_case/user_usecase"));
const userUsecase = new user_usecase_1.default(prisma_1.default);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            roleId: req.body.roleId
        };
        const newUser = yield userUsecase.createUser(user);
        res.json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error + 'Unable to create user' });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userUsecase.getUser();
    res.json(users);
});
exports.getUser = getUser;
