import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}
