import { Module } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './vouchers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
