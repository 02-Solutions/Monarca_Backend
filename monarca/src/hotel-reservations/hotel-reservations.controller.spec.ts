import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationsController } from './hotel-reservations.controller';

describe('HotelReservationsController', () => {
  let controller: HotelReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelReservationsController],
    }).compile();

    controller = module.get<HotelReservationsController>(HotelReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
