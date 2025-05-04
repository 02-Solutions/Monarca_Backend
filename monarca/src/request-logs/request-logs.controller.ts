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
import { RequestLogsService } from './request-logs.service';
import { CreateRequestLogDto } from './dto/create-request-log.dto';
import { UpdateRequestLogDto } from './dto/update-request-log.dto';

@Controller('request-logs')
export class RequestLogsController {
  constructor(private readonly logsService: RequestLogsService) {}

  @Post()
  async create(
    @Body() data: CreateRequestLogDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('CreateRequestLogDto:', data);
    const result = await this.logsService.create(data);
    res.status(201);
    return result;
  }

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.logsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestLogDto,
  ) {
    return this.logsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.logsService.remove(id);
  }
}
