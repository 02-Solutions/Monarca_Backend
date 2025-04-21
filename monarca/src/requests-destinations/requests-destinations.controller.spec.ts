import { Test, TestingModule } from '@nestjs/testing';
import { RequestsDestinationsController } from './requests-destinations.controller';
import { RequestsDestinationsService } from './requests-destinations.service';

describe('RequestsDestinationsController', () => {
  let controller: RequestsDestinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsDestinationsController],
      providers: [RequestsDestinationsService],
    }).compile();

    controller = module.get<RequestsDestinationsController>(RequestsDestinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
