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

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.logsService.findOne(id);
  }
}
