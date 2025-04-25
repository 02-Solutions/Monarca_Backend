import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './vouchers.entity';
import { CreateVoucherDto } from './DTO/Create-Voucher-DTO';
@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  async findOne(id: number) {
    // Using the 'where' option to find the voucher by its 'id'
    const voucher = await this.voucherRepository.findOne({
      where: { id }, // The condition for the search
    });

    if (!voucher) {
      throw new Error('Voucher not found');
    }

    // Return the data formatted as a DTO
    return voucher;
  }
  async createOne(createVoucherDto: CreateVoucherDto) {
    const voucher = this.voucherRepository.create({
      id_request: createVoucherDto.id_request,
      class: createVoucherDto.class,
      amount: createVoucherDto.amount,
      date: new Date(createVoucherDto.date),
      file_url: createVoucherDto.file_url,
    });

    return await this.voucherRepository.save(voucher);
  }
}
