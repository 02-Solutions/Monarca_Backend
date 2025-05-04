import { PartialType } from '@nestjs/swagger';
import { CreateRequestLogDto } from './create-request-log.dto';

export class UpdateRequestLogDto extends PartialType(CreateRequestLogDto) {}
