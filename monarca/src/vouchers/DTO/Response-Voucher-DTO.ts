import { IsInt, IsString, IsNumber, IsDateString } from 'class-validator';

// src/vouchers/dto/Response-Voucher-DTO.ts
export class VoucherResponseDTO {
    id: number;
    id_request: number;
    class: string;
    amount: number;
    date: string; // Date as a string in ISO format
    file_url: string;
  
    constructor(voucher: Partial<VoucherResponseDTO>) {
      this.id = voucher.id;
      this.id_request = voucher.id_request;
      this.class = voucher.class;
      this.amount = voucher.amount;
      this.date = voucher.date;
      this.file_url = voucher.file_url;
    }
  }
  