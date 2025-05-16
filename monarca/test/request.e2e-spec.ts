// test/request.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import { CreateRequestDto } from 'src/requests/dto/create-request.dto';
dotenv.config();

describe('Requests (e2e) - Full CRUD + Nested Destinations', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Fake sessionInfo so guards see a valid user
    app.use((req, _res, next) => {
      (req as any).sessionInfo = { id: 'test123' };
      next();
    });

    // Same global ValidationPipe as your main.ts
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

  it('POST /requests → create a new Request', async () => {
    const dto: CreateRequestDto = {
      title: 'E2E Full CRUD Trip',
      id_origin_city: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      motive: 'Testing full CRUD suite',
      requirements: 'None',
      priority: 'medium',
      advance_money: 0,
      requests_destinations: [
        {
          id_destination: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          destination_order: 1,
          stay_days: 3,
          arrival_date: new Date('2025-05-15T09:00:00.000Z'),
          departure_date: new Date('2025-05-18T09:00:00.000Z'),
          is_hotel_required: false,
          is_plane_required: true,
          is_last_destination: true,
          details: 'Initial destination',
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .post('/requests')
      .send(dto)
      .expect(201);

    createdId = res.body.id;
    expect(createdId).toBeDefined();
    expect(res.body.title).toBe(dto.title);
    expect(res.body.requests_destinations).toHaveLength(1);
  });

  it('GET /requests/:id → returns the created Request', async () => {
    const res = await request(app.getHttpServer())
      .get(`/requests/${createdId}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
    expect(res.body.requests_destinations[0].stay_days).toBe(3);
  });

  it('PATCH /requests/:id → update nested destinations', async () => {
    // 1) Fetch current destinations
    const getRes = await request(app.getHttpServer())
      .get(`/requests/${createdId}`)
      .expect(200);

    const originalDests = getRes.body.requests_destinations as any[];
    expect(originalDests).toHaveLength(1);

    // 2) Modify the first one and add a new one
    const updatedFirst = {
      ...originalDests[0],
      stay_days: 5, // changed
    };
    const newDest = {
      id_destination: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      destination_order: 2,
      stay_days: 2,
      arrival_date: new Date('2025-06-01T10:00:00.000Z'),
      departure_date: new Date('2025-06-03T18:00:00.000Z'),
      is_hotel_required: true,
      is_plane_required: false,
      is_last_destination: false,
      details: 'Added by e2e',
    };

    // 3) Send the update
    const patchRes = await request(app.getHttpServer())
      .patch(`/requests/${createdId}`)
      .send({ requests_destinations: [updatedFirst, newDest] })
      .expect(200);

    const destsAfter = patchRes.body.requests_destinations as any[];
    expect(destsAfter).toHaveLength(2);

    // 4) Assert the first stayed changed, second exists
    const firstAfter = destsAfter.find((d) => d.id === updatedFirst.id);
    const secondAfter = destsAfter.find(
      (d) => d.id_destination === newDest.id_destination,
    );

    expect(firstAfter.stay_days).toBe(5);
    expect(secondAfter).toBeDefined();
    expect(secondAfter.stay_days).toBe(2);
    expect(secondAfter.details).toBe('Added by e2e');
  });

  it('DELETE /requests/:id → remove the Request', async () => {
    await request(app.getHttpServer())
      .delete(`/requests/${createdId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/requests/${createdId}`)
      .expect(404);
  });
});
