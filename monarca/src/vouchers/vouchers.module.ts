import { Module } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/vouchers.entity';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Voucher, RequestsDestination])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
