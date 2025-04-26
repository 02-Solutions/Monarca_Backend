import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({
    description: 'Identifier of the related travel request',
    example: 'request-uuid-123',
  })
  @IsUUID()
  id_request_destination: string;

  @ApiProperty({
    description: 'Voucher classification or type',
    example: 'GAS Gasolina',
  })
  @IsString()
  class: string;

  @ApiProperty({
    description: 'Monetary amount of the voucher',
    example: 150.0,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'The currency used',
    example: 'USD',
  })
  @IsNumber()
  currency: string;

  @ApiProperty({
    description: 'Date when the voucher was issued',
    example: '2025-04-25T00:00:00.000Z',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'URL pointing to the stored voucher file',
    example: 'https://storage.example.com/vouchers/voucher-123.pdf',
  })
  @IsString()
  file_url: string;

  @ApiProperty({
    description: 'Status of approval',
    example: 'voucher denied',
  })
  @IsString()
  status: string;
}
