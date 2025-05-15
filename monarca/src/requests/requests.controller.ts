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
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { RequestInterface } from 'src/guards/interfaces/request.interface';

@UseGuards(AuthGuard, PermissionsGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(
    @Request() req: RequestInterface,
    @Body() data: CreateRequestDto,
  ) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in session');
    }
    return this.requestsService.create(userId, data);
  }

  @Get('user')
  async findByUser(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in session');
    }
    return this.requestsService.findByUser(userId);
  }

  @Get('all')
  async findAll() {
    return this.requestsService.findAll();
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
    const existing = await this.requestsService.findOne(id);
    if (
      existing.status !== 'pending review' &&
      existing.status !== 'pending changes'
    ) {
      throw new BadRequestException(
        `Cannot update a request when status is "${existing.status}".`,
      );
    }
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
