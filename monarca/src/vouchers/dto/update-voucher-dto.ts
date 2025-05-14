import { CreateVoucherDto } from './create-voucher-dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {}
