import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('NotificationsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Incluye todo el backend real
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notifications/send (POST) - should send email', async () => {
    const response = await request(app.getHttpServer())
      .post('/notifications/send')
      .send({
        to: 'correo@ejemplo.com',
        subject: 'Prueba E2E',
        text: 'Esto es una prueba end-to-end',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Correo enviado correctamente.');

  });

  afterAll(async () => {
    await app.close();
  });
});
