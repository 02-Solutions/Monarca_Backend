import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { RevisionsService } from './revisions.service';
import { CreateRevisionDto } from './dto/create-revision.dto';

@Controller('revisions')
export class RevisionsController {
    constructor (private readonly revisionsService : RevisionsService){}

    @Get(':id_request')
    getRequestRevisions(@Param('id_request', ParseUUIDPipe) id_request: string)
    {
        return this.revisionsService.getRequestRevisions(id_request);
    }

    @Post()
    postRevision(@Body() dto : CreateRevisionDto)
    {
        // console.log(dto);
        return this.revisionsService.create(dto);
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

  @Get(':id_request')
  getRequestRevisions(@Param('id_request', ParseUUIDPipe) id_request: string) {
    return this.revisionsService.getRequestRevisions(id_request);
  }

  @Post()
  postRevision(@Body() dto: CreateRevisionDto) {
    // console.log(dto);
    return this.revisionsService.create(dto);
  }
}
