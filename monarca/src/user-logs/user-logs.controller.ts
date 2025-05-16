import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';

@Controller('user-logs')
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Post()
  create(@Body() dto: CreateUserLogDto) {
    return this.userLogsService.create(dto);
  }

  @Get()
  findAll() {
    return this.userLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserLogDto) {
    return this.userLogsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogsService.remove(id);
  }
}
