import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString, isUUID } from "class-validator";

export class CreateUserLogDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id_user: number;

  @ApiProperty({ example: '2023-12-01T10:00:00Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: '192.168.1.1' })
  @IsString()
  ip: string;

  @ApiProperty({ example: 'User accessed the dashboard' })
  @IsString()
  report: string;
}
