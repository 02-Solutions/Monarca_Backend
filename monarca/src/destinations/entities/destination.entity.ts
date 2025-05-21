import { Request } from 'src/requests/entities/request.entity';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'destinations' })
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  city: string;

  //RELATIONSHIPS

  @OneToMany(() => Request, (req) => req.destination, {
    cascade: true,
  })
  requests: Request[];

  @OneToMany(() => RequestsDestination, (reqdest) => reqdest.destination, {
    cascade: true,
  })
  requests_destinations: RequestDestination[];
}
