import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RevisionsService } from './revisions.service';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';

@UseGuards(AuthGuard, PermissionsGuard)
@Controller('revisions')
export class RevisionsController {
  constructor(private readonly revisionsService: RevisionsService) {}

  @Post()
  postRevision(
    @Request() req: RequestInterface,
    @Body() dto: CreateRevisionDto,
  ) {
    // console.log(dto);
    return this.revisionsService.create(req, dto);
  }
  /* Para sacar userId de la cookie */
  // @UseGuards(AuthGuard)
  // @Post()
  // postRevision(@Body() dto : CreateRevisionDto, @Request() req)
  // {
  //     // console.log(dto);
  //     const userId = req.sessionInfo.id; // desde cookie JWT
  //     return this.revisionsService.create(dto, userId);
  // }
}
