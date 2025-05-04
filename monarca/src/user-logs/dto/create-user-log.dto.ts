import { ApiProperty } from "@nestjs/swagger";

export class CreateUserLogDto {
  @ApiProperty({ example: 1 })
  id_user: number;

  @ApiProperty({ example: '2023-12-01T10:00:00Z' })
  date: Date;

  @ApiProperty({ example: '192.168.1.1' })
  ip: string;

  @ApiProperty({ example: 'User accessed the dashboard' })
  report: string;
}
