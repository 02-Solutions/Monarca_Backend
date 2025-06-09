import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import { UpdateVoucherDto } from 'src/vouchers/dto/update-voucher-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import * as path from 'path';
import * as fs   from 'fs';

const REQUESTER_ID= "5932b459-a3ea-46a1-8482-d56bfda8c866";
const REQUEST_ID="581c998a-9f67-4431-b6ab-635ec9794ba7";
let  admin_id="";
let actingUserId: string;

const authStub = {
  canActivate: (ctx) => {
    const req = ctx.switchToHttp().getRequest();
    req.sessionInfo = { id: actingUserId };
    return true;
  },
};

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'vouchers');

// helper that returns the first file whose name ends with <ext>
function pickFile(ext: string): string {
  const file = fs
    .readdirSync(UPLOAD_DIR)
    .find((f) => f.toLowerCase().endsWith(ext.toLowerCase()));

  if (!file) throw new Error(`No *${ext} file found in ${UPLOAD_DIR}`);
  return path.join(UPLOAD_DIR, file);
}
const pdfPath = pickFile('.pdf'); 
const xmlPath = pickFile('.xml');  

dotenv.config();
describe('Vouchers e2e', () => {
  let app: INestApplication;
  let voucherId: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideGuard(AuthGuard).useValue(authStub)
    .overrideGuard(PermissionsGuard).useValue({ canActivate: () => true })
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

  it('/vouchers/581c998a-9f67-4431-b6ab-635ec9794ba7 (GET) debe retornar todas relacionadas a ese request ID', async () => {
    actingUserId= admin_id;
      const res = await request(app.getHttpServer())
        .get('/vouchers/581c998a-9f67-4431-b6ab-635ec9794ba7')
        .expect(200);
  
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('/vouchers/upload (POST) debe registar una', async () => {
      actingUserId= REQUESTER_ID;
      const res = await request(app.getHttpServer())
      .post('/vouchers/upload')
      .field('id_request', REQUEST_ID)
      .field('class', 'HOTEL')
      .field('amount', '150')
      .field('currency', 'JPY')                 // valid enum value
      .field('date', '2025-04-25T00:00:00.000Z')
      .field('status', 'voucher approved')
      .field('id_approver', '')
      .field('tax_type', 'IVA 16%')
      // attach real files; they can be tiny fixtures in test/fixtures/
      .attach('file_url_pdf',pdfPath)
      .attach('file_url_xml',xmlPath)
      .expect(201); 
      voucherId = res.body.id;
      admin_id= res.body.id_approver;


      });

      it('/vouchers/:id (PATCH) debe actualizar una por ID', async () => {

        actingUserId = REQUESTER_ID;
      
        const updateDto: UpdateVoucherDto = {

          amount: 200,
          currency: 'JPY',          
          class: 'HOTEL',
        };
      
        const { body } = await request(app.getHttpServer())
          .patch(`/vouchers/${voucherId}`)
          .send(updateDto)
          .expect(200);
      
        expect(body.amount).toBe(200);
        expect(body.currency).toBe('JPY');
      });

      it('/vouchers/:id/approve (patch) debe aprovar una por ID', async () => {

        actingUserId = admin_id;
      
        const {body}= await request(app.getHttpServer())
          .patch(`/vouchers/${voucherId}/approve`)
          .expect(200);
        expect(body.status).toBe(true)
      });

      it('/vouchers/:id/deny (patch) debe denegar una por ID', async () => {

        actingUserId = admin_id;
      
       const {body}= await request(app.getHttpServer())
          .patch(`/vouchers/${voucherId}/deny`)
          .expect(200);
        expect(body.status).toBe(true)


      });

      it('/vouchers/ (GET) Regresa todos los vouchers de la BD', async () => {
        actingUserId= admin_id;
          const res = await request(app.getHttpServer())
            .get('/vouchers/')
            .expect(200);
      
          expect(Array.isArray(res.body)).toBe(true);
        });

});