import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'user_logs' })
export class UserLogs {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1' })
  @Column()
  id_user: string;

  @ApiProperty({ example: '2025-05-17' })
  @Column()
  date: Date;

  @ApiProperty({ example: '192.168.1.1' })
  @Column()
  ip: string;

  @ApiProperty({ example: 'report' })
  @Column()
  report: string;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'id_user' })
  user: User;

}
