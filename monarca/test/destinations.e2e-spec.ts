import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Destinations e2e', () => {
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

  it('/destinations (POST) debe crear un destino', async () => {
    const dto = { country: 'España', city: 'Madrid' };

    const res = await request(app.getHttpServer())
      .post('/destinations')
      .send(dto)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.country).toBe(dto.country);
    expect(res.body.city).toBe(dto.city);

    // Eliminar después de testear
    await request(app.getHttpServer())
      .delete(`/destinations/${res.body.id}`)
      .expect(200);
  });

  it('/destinations (GET) debe retornar todos los destinos', async () => {
    const res = await request(app.getHttpServer())
      .get('/destinations')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/destinations/:id (GET) debe retornar un destino por ID', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/destinations')
      .send({ country: 'México', city: 'Cancún' })
      .expect(201);

    const created = createRes.body;

    const res = await request(app.getHttpServer())
      .get(`/destinations/${created.id}`)
      .expect(200);

    expect(res.body.id).toBe(created.id);
    expect(res.body.city).toBe('Cancún');

    await request(app.getHttpServer())
      .delete(`/destinations/${created.id}`)
      .expect(200);
  });

  it('/destinations/:id (PATCH) debe actualizar un destino', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/destinations')
      .send({ country: 'USA', city: 'New York' })
      .expect(201);

    const id = createRes.body.id;

    const updated = await request(app.getHttpServer())
      .patch(`/destinations/${id}`)
      .send({ city: 'Los Angeles' })
      .expect(200);

    expect(updated.body.city).toBe('Los Angeles');

    await request(app.getHttpServer())
      .delete(`/destinations/${id}`)
      .expect(200);
  });

  it('/destinations/:id (DELETE) debe eliminar un destino', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/destinations')
      .send({ country: 'Italia', city: 'Roma' })
      .expect(201);

    const id = createRes.body.id;

    const deleteRes = await request(app.getHttpServer())
      .delete(`/destinations/${id}`)
      .expect(200);

    expect(deleteRes.body.status).toBe(true);
    expect(deleteRes.body.message).toContain(id);
  });
});
