import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dtos';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { UploadPdfInterceptor } from 'src/utils/uploadPdf.middleware';

@UseGuards(AuthGuard,PermissionsGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseInterceptors(UploadPdfInterceptor())
  @Post()
  async createReservation(
    @Request() req : RequestInterface,
    @UploadedFiles()
        files: {
          file?: Express.Multer.File[];
        },
    @Body() createReservationDto: CreateReservationDto,
    ) {
      // flatten both arrays into one list
    const uploaded = [
      ...(files.file || []),

    ];

    const fileMap: Record<string, string> = {};

    for (const file of uploaded) {
      const publicUrl = `http://localhost:3000/files/reservations/${file.filename}`;
      if (file.fieldname === 'file') {
        fileMap.link = publicUrl;
      } }
    return this.reservationsService.createReservation(req, 
      {
        ...createReservationDto,
        ...fileMap,
      } as CreateReservationDto
    );
    
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.reservationsService.remove(id);
  }
}
