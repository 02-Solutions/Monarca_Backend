import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import {
  CreateReservationDto,
  ReservationDto,
} from 'src/reservations/dto/reservation.dtos';
dotenv.config();

describe('reservations e2e', () => {
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

  it('/reservations (POST) debe crear una reservacion', async () => {
    const dto = {
      title: 'Reserva de taxi aeropuerto',
      comments:
        'Taxi reservado para el usuario María García, llegada estimada a las 08:30 AM',
      link: 'https://taxi-service.com/booking/abc123',
      id_request_destination: '17c8984c-ee37-44cf-8138-9728063b4560',
    };
    const res = await request(app.getHttpServer())
      .post('/reservations')
      .send(dto)
      .expect(201);
    console.log('Raw Response:', res.body);

    expect(res.body).toHaveProperty('id');

    const data = res.body;

    expect(data.title).toBe(dto.title);
    expect(data.comments).toBe(dto.comments);
    expect(data.link).toBe(dto.link);
    expect(data.id_request_destination).toBe(dto.id_request_destination);
    await request(app.getHttpServer())
      .delete(`/reservations/${data.id}`)
      .expect(200);
  });

  it('/reservations (GET) debe retornar todas las reservaciones', async () => {
    const res = await request(app.getHttpServer())
      .get('/reservations')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/reservations/:id (GET) debe retornar una reserva por ID', async () => {
    // 1) Creamos primero para obtener su ID dinámico
    const createRes = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        title: 'Reserva de taxi',
        comments: 'Taxi reservado para el usuario',
        link: 'https://example.com/reservation/12345',
        id_request_destination: '17c8984c-ee37-44cf-8138-9728063b4560',
      })
      .expect(201);

    const data = createRes.body;

    // 2) Ahora lo buscamos por ese mismo ID
    const res = await request(app.getHttpServer())
      .get(`/reservations/${data.id}`)
      .expect(200);

    const retrieved_data = res.body;
    expect(retrieved_data.id).toBe(data.id);

    await request(app.getHttpServer())
      .delete(`/reservations/${data.id}`)
      .expect(200);
  });

  it('/reservations/:id (PATCH) debe actualizar uno o mas parametros de la reserva', async () => {
    // 1) Creamos primero para obtener su ID dinámico
    const createRes = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        title: 'Reserva de taxi',
        comments: 'Taxi reservado para el usuario',
        link: 'https://example.com/reservation/12345',
        id_request_destination: '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
      })
      .expect(201);

    const data = createRes.body
    // 2) Ahora lo actualizamos su comentario
    const updatedComment =
      'Taxi reservado para el usuario Juan Pérez, llegada estimada a las 09:00 AM';
    const res = await request(app.getHttpServer())
      .patch(`/reservations/${data.id}`)
      .send({ comments: updatedComment })
      .expect(200);

    const updatedReservation = await request(app.getHttpServer())
      .get(`/reservations/${data.id}`)
      .expect(200);

    const retrieved_data = updatedReservation.body;
    expect(retrieved_data.comments).toBe(updatedComment);

    await request(app.getHttpServer())
      .delete(`/reservations/${data.id}`)
      .expect(200);
  });

  it('/reservations/:id (DELETE) debe borrar la reserva', async () => {
    // 1) Creamos primero para obtener su ID dinámico
    const createRes = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        title: 'Reserva de taxi',
        comments: 'Taxi reservado para el usuario',
        link: 'https://example.com/reservation/12345',
        id_request_destination: '17c8984c-ee37-44cf-8138-9728063b4560',
      })
      .expect(201);

    const data = createRes.body;
    // 2) Ahora la borramos

    await request(app.getHttpServer())
      .delete(`/reservations/${data.id}`)
      .expect(200);

    // 3) Verificamos que ya no existe
    await request(app.getHttpServer())
      .get(`/reservations/${data.id}`)
      .expect(404);
  });
});
