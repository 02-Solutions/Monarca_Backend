import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'src/requests/entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'travel_agencies' })
export class TravelAgency {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Travel Agency Name' })
  @Column({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Request, (req) => req.travel_agency, {})
  requests: Request[];

  @OneToMany(() => User, (user) => user.travel_agency, {})
  users: User[];
}
