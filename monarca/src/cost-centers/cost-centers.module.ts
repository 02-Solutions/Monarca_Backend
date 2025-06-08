import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenter } from './entity/cost-centers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostCenter])],
  exports: [TypeOrmModule],
})
export class CostCentersModule {}
