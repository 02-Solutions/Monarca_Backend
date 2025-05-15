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

  @Get('user')
  async findByUser(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findByUser(userId);
  }

  @Get('assigned')
  async findAssigned(@Request() req: RequestInterface) {
    const userId = req.sessionInfo.id;
    if (!userId) {
      throw new Error('User ID not found in cookies');
    }
    return this.requestsService.findByAdmin(userId);
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

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateRequestDto,
  ) {
    return this.requestsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.requestsService.remove(id);
  }
}
