import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher-dto';
import { UpdateVoucherDto } from './dto/update-voucher-dto';
import { Voucher } from './entities/vouchers.entity';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private readonly repo: Repository<Voucher>,
  ) {}

  async create(data: CreateVoucherDto): Promise<Voucher> {
    const voucher = this.repo.create({
      id_request_destination: data.id_request_destination, // Using the correct DTO property
      class: data.class,
      amount: data.amount,
      currency: data.currency,
      date: new Date(data.date), // Ensuring that the date is correctly parsed
      fileUrl: data.file_url,
      status: data.status, // Mapping the correct file URL
    });
    return this.repo.save(voucher);
  }

  async findAll(): Promise<Voucher[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Voucher> {
    const voucher = await this.repo.findOne({ where: { id } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async update(id: string, data: UpdateVoucherDto): Promise<Voucher> {
    const existingVoucher = await this.findOne(id); // Ensure we find the voucher first

    const updatedVoucherData = {
      // Update only provided fields
      requestId:
        data.id_request_destination ?? existingVoucher.id_request_destination, // Use existing if not provided
      class: data.class ?? existingVoucher.class, // Use existing if not provided
      amount: data.amount ?? existingVoucher.amount, // Use existing if not provided
      currency: data.currency ?? existingVoucher.currency, // Use existing if not provided
      date: data.date ? new Date(data.date) : existingVoucher.date, // Update only if new date is provided
      fileUrl: data.file_url ?? existingVoucher.fileUrl, // Use existing if not provided
      status: data.status ?? existingVoucher.status,
    };

    // Now update and return the updated entity
    await this.repo.update(id, updatedVoucherData);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return { status: true, message: `Voucher with ID ${id} removed` };
  }
}
