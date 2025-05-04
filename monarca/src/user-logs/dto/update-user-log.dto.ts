import { PartialType } from '@nestjs/swagger';
import { CreateUserLogDto } from './create-user-log.dto';

export class UpdateUserLogDto extends PartialType(CreateUserLogDto) {}
