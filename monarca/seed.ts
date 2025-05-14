import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SeedService } from './seed.service';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeedService);
  await seeder.run();
  await app.close();
}

runSeed();