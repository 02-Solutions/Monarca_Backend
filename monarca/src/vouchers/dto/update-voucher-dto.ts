import { CreateVoucherDto } from './Create-Voucher-dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {}
