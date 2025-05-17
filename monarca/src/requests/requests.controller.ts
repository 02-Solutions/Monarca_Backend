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
  UseGuards,
  Put,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
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
    const result = await this.requestsService.create(req, data);
    return result;
  }

  @Get('user')
  async findByUser(@Request() req: RequestInterface) {
    return this.requestsService.findByUser(req);
  }

  @Get('to-approve')
  async findAssignedApprover(@Request() req: RequestInterface) {
    return this.requestsService.findByAdmin(req);
  }

  @Get('to-approve-SOI')
  async findAssignedSOI(@Request() req: RequestInterface) {
    return this.requestsService.findBySOI(req);
  }

  @Get('all')
  async findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.requestsService.findOne(req, id);
  }

  @Put(':id')
  async updateRequest(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestDto,
    @Request() req: RequestInterface,
  ) {
    return this.requestsService.updateRequest(req, id, data);
  }
}
