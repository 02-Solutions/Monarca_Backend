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

  it('/logout (POST) should clear session', async () => {
    const agent = request.agent(app.getHttpServer());

    // First login
    await agent.post('/login').send({
      email: 'admin-uuid@example.com',
      password: 'password',
    });

    // Then logout
    const res = await agent.post('/login/logout').expect(200);
    expect(res.body.message).toMatch(/logged out successfully/i);
  });
});