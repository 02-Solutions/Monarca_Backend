import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';

dotenv.config();

describe('Requests e2e', () => {
  let app: INestApplication;
  let createdRequestId: string;
  let assignedAdminId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.sessionInfo = {
            id: '5932b459-a3ea-46a1-8482-d56bfda8c866',
          };
          req.userInfo = {
            id_department: '883d9e05-612c-4d08-9efb-5099952fc850',
            id_travel_agency: null,
          };
          return true;
        },
      })
      .overrideGuard(PermissionsGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

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

  it('/requests (POST) debe crear una solicitud', async () => {
    const requestBody = {
      id_origin_city: 'd7ee631a-c1b8-42f0-8ae6-cd4d6b23470f',
      title: 'Viaje de Capacitación',
      motive: 'Asistencia a evento técnico',
      advance_money: 5000,
      requirements: 'Silla de ruedas',
      priority: 'high',
      requests_destinations: [
        {
          id_destination: '04963809-842e-457a-97aa-ac885bd6e1bf',
          destination_order: 1,
          stay_days: 5,
          arrival_date: new Date('2025-06-10T10:00:00Z'),
          departure_date: new Date('2025-06-15T10:00:00Z'),
          is_hotel_required: true,
          is_plane_required: false,
          is_last_destination: true,
          details: 'Hotel cerca del evento',
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .post('/requests')
      .send(requestBody)
      .expect(201);

    createdRequestId = res.body.id;
    assignedAdminId = res.body.id_admin;

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(requestBody.title);
  });

  it('/requests/:id (GET) debe obtener una solicitud por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/requests/${createdRequestId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdRequestId);
  });

  it('/requests/:id (PUT) debe actualizar la solicitud', async () => {
    const updateBody = {
      id_origin_city: 'd7ee631a-c1b8-42f0-8ae6-cd4d6b23470f',
      title: 'Viaje Actualizado',
      motive: 'Nuevo motivo actualizado',
      advance_money: 7500,
      requirements: 'Sin requisitos',
      priority: 'medium',
      requests_destinations: [
        {
          id_destination: '04963809-842e-457a-97aa-ac885bd6e1bf',
          destination_order: 1,
          stay_days: 4,
          arrival_date: new Date('2025-06-11T10:00:00Z'),
          departure_date: new Date('2025-06-15T10:00:00Z'),
          is_hotel_required: false,
          is_plane_required: true,
          is_last_destination: true,
          details: 'Detalles nuevos',
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .put(`/requests/${createdRequestId}`)
      .send(updateBody)
      .expect(200);

    expect(res.body.advance_money).toBe(7500);
    expect(res.body.priority).toBe('medium');
    expect(res.body.status).toBe('Pending Review');
  });

  it('/requests/approve/:id (PATCH) debe cambiar el estado a Pending Reservations', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.sessionInfo = { id: assignedAdminId };
          req.userInfo = { id_department: '...', id_travel_agency: null };
          return true;
        },
      })
      .overrideGuard(PermissionsGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    const isolatedApp = moduleFixture.createNestApplication();
    await isolatedApp.init();

    const travelAgencyRes = await request(isolatedApp.getHttpServer())
      .post('/travel-agencies')
      .send({ name: 'Agencia de Prueba' })
      .expect(201);

    const approveBody = {
      id_travel_agency: travelAgencyRes.body.id,
    };

    const res = await request(isolatedApp.getHttpServer())
      .patch(`/requests/approve/${createdRequestId}`)
      .send(approveBody)
      .expect(200);

    expect(res.body.status).toBe('Pending Reservations');

    await isolatedApp.close();
  });
});
