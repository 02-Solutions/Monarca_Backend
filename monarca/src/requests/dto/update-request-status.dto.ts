import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRequestStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
