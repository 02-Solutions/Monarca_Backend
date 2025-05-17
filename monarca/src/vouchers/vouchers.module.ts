import { Module, Req } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/vouchers.entity';
import { Request } from 'src/requests/entities/request.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Voucher,Request ])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
