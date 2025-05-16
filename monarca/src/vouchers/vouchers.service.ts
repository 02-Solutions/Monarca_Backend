import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher-dto';
import { UpdateVoucherDto } from './dto/update-voucher-dto';
import { Voucher } from './entities/vouchers.entity';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { privateDecrypt } from 'crypto';
@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,
    @InjectRepository(RequestsDestination)
    private readonly rdRepo: Repository<RequestsDestination>,
  ) {}

  async create(data: CreateVoucherDto): Promise<Voucher> {
    const rd = await this.rdRepo.findOne({
      where: { id: data.id_request_destination },
      relations: ['request'], // ← make sure your RD entity has @ManyToOne(() => Request, ...)
    });
    if (!rd) {
      throw new NotFoundException(
        `RequestDestination ${data.id_request_destination} not found`,
      );
    }
    const approverId = rd.request.id_user;

    const voucher = this.voucherRepo.create({
      id_request_destination: data.id_request_destination, // Using the correct DTO property
      class: data.class,
      amount: data.amount,
      currency: data.currency,
      date: new Date(data.date), // Ensuring that the date is correctly parsed
      file_url_pdf: data.file_url_pdf,
      file_url_xml: data.file_url_xml,
      status: data.status,
      approver_id: approverId, // Mapping the correct file URL
    });
    return this.voucherRepo.save(voucher);
  }

  async findAll(): Promise<Voucher[]> {
    return this.voucherRepo.find();
  }

  async findOne(id: string): Promise<Voucher> {
    const voucher = await this.voucherRepo.findOne({ where: { id } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async update(id: string, data: UpdateVoucherDto): Promise<Voucher> {
    const existingVoucher = await this.findOne(id); // Ensure we find the voucher first

    const updatedVoucherData = {
      // Update only provided fields
      id_request_destination:
        data.id_request_destination ?? existingVoucher.id_request_destination, // Use existing if not provided
      class: data.class ?? existingVoucher.class, // Use existing if not provided
      amount: data.amount ?? existingVoucher.amount, // Use existing if not provided
      currency: data.currency ?? existingVoucher.currency, // Use existing if not provided
      date: data.date ? new Date(data.date) : existingVoucher.date, // Update only if new date is provided
      file_url_pdf: data.file_url_pdf ?? existingVoucher.file_url_pdf, // Use existing if not provided
      file_url_xml: data.file_url_xml ?? existingVoucher.file_url_xml, // Use existing if not provided
      status: data.status ?? existingVoucher.status,
    };

    // Now update and return the updated entity
    await this.voucherRepo.update(id, updatedVoucherData);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    const result = await this.voucherRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return { status: true, message: `Voucher with ID ${id} removed` };
  }
}
