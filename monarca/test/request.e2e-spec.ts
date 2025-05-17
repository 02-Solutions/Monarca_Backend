import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import { CreateRequestDto } from 'src/requests/dto/create-request.dto';
dotenv.config();

describe('Requests (e2e) - Full CRUD', () => {
  let app: INestApplication;
  let createdId: string | null;

  beforeAll(async () => {
    // Build the testing module using our AppModule (full app context)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Instantiate the Nest application
    app = moduleFixture.createNestApplication();

    // Fake sessionInfo so GET /requests/user has a userId to work with
    app.use((req, _res, next) => {
      (req as any).sessionInfo = { userId: 'test123' };
      next();
    });

    // Apply the same global validation pipe as in main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // auto-transform payloads to DTO instances
        whitelist: true, // strip unknown properties
        forbidNonWhitelisted: true, // throw on unknown properties
      }),
    );

    await app.init();
    createdId = null; // initialize our placeholder for the created request ID
  });

  afterAll(async () => {
    // Clean up: delete the created request if it still exists
    if (createdId) {
      await request(app.getHttpServer())
        .delete(`/requests/${createdId}`)
        .expect(200);
    }
    await app.close();
  });

  it('POST /requests → create a new Request', async () => {
    // Prepare a valid CreateRequestDto payload
    const dto: CreateRequestDto = {
      id_origin_city: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'E2E Full CRUD Trip',
      motive: 'Testing full CRUD suite',
      requirements: 'None',
      priority: 'medium',
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
          details: 'DTO-only field',
        },
      ],
    };

    // Send POST and expect HTTP 201 Created
    const res = await request(app.getHttpServer())
      .post('/requests')
      .send(dto)
      .expect(201);

    // Capture the ID for subsequent tests
    createdId = res.body.id;

    // Assert the created record has an ID and matches our motive & priority
    expect(createdId).toBeDefined();
    expect(res.body.motive).toBe(dto.motive);
    expect(res.body.priority).toBe(dto.priority);
  });

  it('GET /requests → list all Requests', async () => {
    // Fetch the list of all requests
    const res = await request(app.getHttpServer()).get('/requests').expect(200);

    // The response should be an array
    expect(Array.isArray(res.body)).toBe(true);

    // Our createdId should appear in that array
    expect(res.body.some((r: any) => r.id === createdId)).toBe(true);
  });

  it('GET /requests/:id → fetch one Request by ID', async () => {
    // Fetch the specific request by its ID
    const res = await request(app.getHttpServer())
      .get(`/requests/${createdId}`)
      .expect(200);

    // The returned object should have the same ID and motive
    expect(res.body.id).toBe(createdId);
    expect(res.body.motive).toBe('Testing full CRUD suite');
  });

  it('GET /requests/user → fetch all Requests for current user', async () => {
    // Fetch requests for the fake userId ('test123')
    const res = await request(app.getHttpServer())
      .get('/requests/user')
      .expect(200);

    // Response should be an array
    expect(Array.isArray(res.body)).toBe(true);

    // Our createdId should be present
    expect(res.body.some((r: any) => r.id === createdId)).toBe(true);
  });

  it('PATCH /requests/:id → update Request fields', async () => {
    // Prepare fields to update
    const updateDto = {
      motive: 'Updated motive text',
      requirements: 'Updated requirements',
      priority: 'high',
    };

    // Send PATCH and expect HTTP 200 OK
    const res = await request(app.getHttpServer())
      .patch(`/requests/${createdId}`)
      .send(updateDto)
      .expect(200);

    // Assert the fields were updated
    expect(res.body.motive).toBe(updateDto.motive);
    expect(res.body.requirements).toBe(updateDto.requirements);
    expect(res.body.priority).toBe(updateDto.priority);
  });

  it('PATCH /requests/status/:id → update Request status', async () => {
    // Prepare status update payload
    const statusDto = { status: 'approved' };

    // Send PATCH and expect HTTP 200 OK
    const res = await request(app.getHttpServer())
      .patch(`/requests/status/${createdId}`)
      .send(statusDto)
      .expect(200);

    // Assert the status field was updated
    expect(res.body.status).toBe(statusDto.status);
  });

  it('DELETE /requests/:id → remove the Request', async () => {
    // Send DELETE and expect HTTP 200 OK
    await request(app.getHttpServer())
      .delete(`/requests/${createdId}`)
      .expect(200);

    // Verify that fetching it again returns 404 Not Found
    await request(app.getHttpServer())
      .get(`/requests/${createdId}`)
      .expect(404);

    // Prevent duplicate deletion in afterAll
    createdId = null;
  });
});
