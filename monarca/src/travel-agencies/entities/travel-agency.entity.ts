import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
