import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Req,
  UseGuards
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher-dto';
import { UpdateVoucherDto } from './dto/update-voucher-dto';
import { Voucher } from './entities/vouchers.entity';
import { ApiTags } from '@nestjs/swagger';
import { UploadPdfInterceptor } from 'src/utils/interceptor.middleware';
import { UseInterceptors, UploadedFiles, InternalServerErrorException } from '@nestjs/common';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';

@UseGuards(AuthGuard, PermissionsGuard)
@ApiTags('Vouchers') // Swagger documentation tag for the controller
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  // Create a new voucher
  @UseInterceptors(UploadPdfInterceptor())
  @Post('upload')
  async uploadVoucher(
    @Req() req: RequestInterface,
    @UploadedFiles()
    files: {
      file_url_pdf?: Express.Multer.File[];
      file_url_xml?: Express.Multer.File[];
    },
    @Body() dto: CreateVoucherDto,
  ) {

    const baseDownloadLink = process.env.DOWNLOAD_LINK;
    const pathToVocuherDownload= "/files/vouchers/";
    if (!baseDownloadLink) {
      throw new InternalServerErrorException('DOWNLOAD_LINK not configured');
    }

    const id_user = req.sessionInfo.id; 
    const fileMap: Record<string, string> = {};

    // flatten both arrays into one list
    const uploaded = [
      ...(files.file_url_pdf || []),
      ...(files.file_url_xml || []),
    ];

    for (const file of uploaded) {
      const publicUrl = `${baseDownloadLink}${pathToVocuherDownload}${file.filename}`;
      if (file.fieldname === 'file_url_pdf') {
        fileMap.file_url_pdf = publicUrl;
      } else if (file.fieldname === 'file_url_xml') {
        fileMap.file_url_xml = publicUrl;
      }
    }

    return this.vouchersService.create(
      id_user,
      {...dto, ...fileMap}
    );
  }

  // Get all vouchers
  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.vouchersService.findAll();
  }

  // Get all vouchers of a requestID
  @Get(':requestId')
  async findByRequest(
    @Param('requestId') requestId: string
  ): Promise<Voucher[]> {
    return this.vouchersService.findByRequest(requestId);
  }
  

  // Update an existing voucher (NO FILE UPDATING)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<Voucher> {
    return this.vouchersService.update(id, updateVoucherDto);
  }


  @Patch(':id/approve')
  async approve(
    @Param('id') id: string,
  ): Promise<{ status: boolean; message: string }> {
    return this.vouchersService.approve(id);
  }

  @Patch(':id/deny')
  async deny(
    @Param('id') id: string,
  ): Promise<{ status: boolean; message: string }> {
    return this.vouchersService.deny(id);
  }

}
