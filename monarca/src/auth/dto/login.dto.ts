import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator';

export class LogInDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  password: string;
}
