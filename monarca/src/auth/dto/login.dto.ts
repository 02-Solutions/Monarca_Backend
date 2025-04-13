import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Length,
  } from 'class-validator';
  
  export class LogInDTO {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;
  }