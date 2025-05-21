import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'juan@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Juan' })
  name: string;

  @ApiProperty({ example: 'López' })
  last_name: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'active' })
  status: string;

  @ApiProperty({ example: 1 })
  id_department?: string;

  @ApiProperty({ example: 2 })
  id_role: string;

  @ApiProperty()
  id_travel_agency?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDto extends OmitType(User, ['password']) {}
