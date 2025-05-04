import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() data: CreateRequestDto) {
    const result = await this.requestsService.create(data);
    return result;
  }

  @Get()
  async findAll() {
    return this.requestsService.findAll();
  }

  @Get('user')
  async findByUser(@Request() req) {
    const userId = req.sessionInfo.userId;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestDto,
  ) {
    return this.requestsService.update(id, data);
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestStatusDto,
  ) {
    return this.requestsService.updateStatus(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.requestsService.remove(id);
  }
}
