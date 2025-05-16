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
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    const result = await this.requestsService.create(userId, data);
    return result;
  }

<<<<<<< HEAD
  @Get()
  async findAll() {
    return this.requestsService.findAll();
  }

=======
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
  @Get('user')
  async findByUser(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findByUser(userId);
  }

<<<<<<< HEAD
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id')
=======
  @Get('to-approve')
  async findAssignedApprover(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findByAdmin(userId);
  }

  @Get('to-approve-SOI')
  async findAssignedSOI(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findBySOI(userId);
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
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestDto,
    @Request() req: RequestInterface,
  ) {
    return this.requestsService.updateRequest(req, id, data);
  }
}
