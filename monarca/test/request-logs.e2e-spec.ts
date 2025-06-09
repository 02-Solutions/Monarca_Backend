import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Request } from 'src/requests/entities/request.entity';
import * as dotenv from 'dotenv';

dotenv.config();

describe('RequestLogs e2e', () => {
  let app: INestApplication;
  let repo: Repository<RequestLog>;
  let createdLogId: string;

  const mockLog = {
    id_request: '581c998a-9f67-4431-b6ab-635ec9794ba7',
    id_user: '5932b459-a3ea-46a1-8482-d56bfda8c866',
    report: 'Solicitud creada en pruebas',
    new_status: 'Pending Review',
    change_date: new Date().toISOString(),
  };

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
    repo = moduleFixture.get<Repository<RequestLog>>(
      getRepositoryToken(RequestLog),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/request-logs (GET) debe retornar todos los logs', async () => {
    const created = await repo.save(repo.create(mockLog));
    createdLogId = created.id;

    const res = await request(app.getHttpServer())
      .get('/request-logs')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((log) => log.id === createdLogId)).toBeDefined();
  });

  it('/request-logs/:id (GET) debe retornar un log específico', async () => {
    const res = await request(app.getHttpServer())
      .get(`/request-logs/${createdLogId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdLogId);
    expect(res.body.id_user).toBe(mockLog.id_user);
    expect(res.body.new_status).toBe(mockLog.new_status);
  });
});
