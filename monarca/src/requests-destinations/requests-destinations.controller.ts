import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestsDestinationsService } from './requests-destinations.service';
import { CreateRequestsDestinationDto } from './dto/create-requests-destination.dto';
import { UpdateRequestsDestinationDto } from './dto/update-requests-destination.dto';

@Controller('requests-destinations')
export class RequestsDestinationsController {
  constructor(
    private readonly destinationsService: RequestsDestinationsService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateRequestsDestinationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('CreateRequestDestinationDto:', data);
    const result = await this.destinationsService.create(data);
    res.status(201);
    return result;
  }

  @Get()
  async findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestsDestinationDto,
  ) {
    return this.destinationsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinationsService.remove(id);
  }
}
