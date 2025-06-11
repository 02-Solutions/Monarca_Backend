import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingMiddleware } from './utils/logging.middleware';
import * as fs from 'fs';
import * as https from 'https';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Read SSL certificate and key files
  const httpsOptions = {
    key: fs.readFileSync('certs/backend-key.pem'),
    cert: fs.readFileSync('certs/backend.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      httpsOptions,
    },
  );

  // Habilitar CORS para permitir peticiones desde el origen del frontend
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());
  app.use(new LoggingMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Monarca API')
    .setDescription('The monarca API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
