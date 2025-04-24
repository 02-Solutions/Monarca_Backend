import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationsService } from './hotel-reservations.service';

describe('HotelReservationsService', () => {
  let service: HotelReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelReservationsService],
    }).compile();

    service = module.get<HotelReservationsService>(HotelReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
