import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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


}
