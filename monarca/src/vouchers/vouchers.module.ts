import { Module, Req } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/vouchers.entity';
import { Request } from 'src/requests/entities/request.entity';
import { GuardsModule } from 'src/guards/guards.module';
@Module({
  imports: [TypeOrmModule.forFeature([Voucher,Request ]),
  GuardsModule

],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
