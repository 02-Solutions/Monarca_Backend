import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Auth e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const registerDTO = {
    name: 'Test',
    last_name: 'User',
    email: 'test-user@example.com',
    password: 'test1234',
    id_department: '7a3b6dae-6b7a-0e6a-4f8a-2e8b9b0f9a7c',
    id_role: '6f2a5c9d-5a6f-9d5f-3e7f-1d7a3a5d3e6b',
    status: 'active',
  };

  it('/register (POST) should register a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/register')
      .send(registerDTO)
      .expect(201);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/success/i);
  });

  it('/login (POST) should authenticate existing user', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .send({
        email: 'admin-uuid@example.com',
        password: 'password',
      })
      .expect(201);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/logged in successfully/i);
  });

  it('/logout (GET) should clear session', async () => {
    const agent = request.agent(app.getHttpServer());

    // First login
    await agent.post('/login').send({
      email: 'admin-uuid@example.com',
      password: 'password',
    });

    // Then logout
    const res = await agent.get('/login/logout').expect(200);
    expect(res.body.message).toMatch(/logged out successfully/i);
  });
});