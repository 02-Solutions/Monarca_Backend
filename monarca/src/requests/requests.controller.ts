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
} from '@nestjs/common';;
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() data: CreateRequestDto) {
    const result = await this.requestsService.create(data);
    return result;
  }

  /* Para sacar el user id de la cookie */
  // @UseGuards(AuthGuard)
  // @Post()
  // async create(@Body() data: CreateRequestDto, @Request() req) {
  //   const userId = req.sessionInfo.id; // desde cookie JWT 
  //   return await this.requestsService.create(data, userId);
  // }

  @Get()
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
    return this.requestsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.requestsService.remove(id);
  }
}
