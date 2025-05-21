import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsChecks {
  constructor(
    @InjectRepository(Destination)
    private readonly destRepo: Repository<Destination>,
  ) {}

  async isValid(id: string): Promise<Boolean> {
    const dest = await this.destRepo.findOneBy({ id });

    return !!dest;
  }
}
