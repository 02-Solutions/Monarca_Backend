import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,

    private readonly notificationsService: NotificationsService 
  ) {}

  async create(data: CreateRequestDto): Promise<Request> {
    const request = this.requestsRepository.create({
      id_user: '1', // Lo obtendremos del session cookie después
      ...data,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        ...destDto,
      })),
    });

    const savedRequest = await this.requestsRepository.save(request);

    await this.notificationsService.sendMail(
      'testing.development81@gmail.com',
      'Solicitud de viaje registrada',
      'Tu solicitud ha sido registrada exitosamente.',
      `<p>Tu solicitud de viaje fue registrada correctamente.</p>`
    );

    return savedRequest;
  }

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find();
  }

  async findOne(id: string): Promise<Request> {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(`Request ${id} not found`);
    }
    return request;
  }

  async update(id: string, data: UpdateRequestDto): Promise<Request> {
    await this.requestsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepository.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
