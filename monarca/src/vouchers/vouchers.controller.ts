import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher-dto';
import { UpdateVoucherDto } from './dto/update-voucher-dto';
import { Voucher } from './entities/vouchers.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vouchers') // Swagger documentation tag for the controller
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  // Create a new voucher
  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return this.vouchersService.create(createVoucherDto);
  }

  // Get all vouchers
  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.vouchersService.findAll();
  }

  // Get a single voucher by its ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Voucher> {
    return this.vouchersService.findOne(id);
  }

  // Update an existing voucher
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<Voucher> {
    return this.vouchersService.update(id, updateVoucherDto);
  }

  // Delete a voucher
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ status: boolean; message: string }> {
    return this.vouchersService.remove(id);
  }
}
