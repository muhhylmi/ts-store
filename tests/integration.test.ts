import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { UserHandler } from '../src/handlers/user_handler';
import UserRepo  from '../src/infrastructure/databases/user_repository';
import IUserRepo  from '../src/domain/repositories/user_repo_int';
import UserUsecase  from '../src/usecases/user_usecase';
import IUserUsecase  from '../src/usecases/user_usercase_int';

const prisma = new PrismaClient();

const userRepo: IUserRepo = new UserRepo();
const userUsecase: IUserUsecase = new UserUsecase(userRepo);
const userHandler = new UserHandler(userUsecase);

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { username: {
      contains: 'test'
    }}
  }); // Kosongkan tabel user sebelum memulai tes
});

afterAll(async () => {
  await prisma.$disconnect(); // Tutup koneksi Prisma setelah semua tes selesai
});

const app = express();
app.use(express.json());
app.post('/users', userHandler.createUser);
app.get('/users', userHandler.getUser);

jest.mock('../src/utils/logger'); // Mock logger supaya tidak perlu logging saat test dijalankan

describe('User API Endpoints', () => {
  describe('POST /users', () => {
    it('should create a user and return the user data', async () => {

      // Supertest request
      const response = await request(app)
        .post('/users')
        .send({ username: 'testuser', password: 'password', roleId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.username).toBe('testuser');
    });

    it('should return 400 if user creation fails', async () => {
      // Mocking prisma to throw error
      const response = await request(app)
        .post('/users')
        .send({ username: 'testuser', password: 'password'});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users', () => {
    it('should return list of users', async () => {
      // Mocking prisma getUser function
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(2);
      expect(response.body[0].username).toBe('user');
    });
  });
});
