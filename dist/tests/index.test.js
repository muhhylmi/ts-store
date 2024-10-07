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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_handler_1 = require("../handler/user_handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/users', user_handler_1.createUser);
app.get('/users', user_handler_1.getUser);
jest.mock('./utils/logger'); // Mock logger supaya tidak perlu logging saat test dijalankan
describe('User API Endpoints', () => {
    describe('POST /users', () => {
        it('should create a user and return the user data', () => __awaiter(void 0, void 0, void 0, function* () {
            // Supertest request
            const response = yield (0, supertest_1.default)(app)
                .post('/users')
                .send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.username).toBe('testuser');
        }));
        it('should return 400 if user creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mocking prisma to throw error
            const response = yield (0, supertest_1.default)(app)
                .post('/users')
                .send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        }));
    });
    describe('GET /users', () => {
        it('should return list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mocking prisma getUser function
            const response = yield (0, supertest_1.default)(app).get('/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            expect(response.body[0].username).toBe('user1');
        }));
    });
});
