import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsDateString,IsOptional, } from 'class-validator';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => Number(value))
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'The currency used',
    example: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Date when the voucher was issued',
    example: '2025-04-25T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'URL pointing to the stored voucher file',
    example: 'https://storage.example.com/vouchers/voucher-123.pdf',
  })
  @IsOptional()
  file_url_pdf?: string;

  @ApiProperty({
    description: 'URL pointing to the stored voucher file',
    example: 'https://storage.example.com/vouchers/voucher-123.xml',
  })
  @IsOptional()
  file_url_xml?: string;

  @ApiProperty({
    description: 'Status of approval',
    example: 'voucher denied',
  })
  @IsString()
  status: string;
  
  @ApiProperty({
    description: 'ID of the person in charge of approving the vouchers',
    example: 'd05c8455-c3d5-4a6c-b79b-2d9c695cd674',
  })
  @IsString()
  approver_id: string;
}
