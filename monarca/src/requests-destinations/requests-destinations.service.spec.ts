import { Test, TestingModule } from '@nestjs/testing';
import { RequestsDestinationsService } from './requests-destinations.service';

describe('RequestsDestinationsService', () => {
  let service: RequestsDestinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestsDestinationsService],
    }).compile();

    service = module.get<RequestsDestinationsService>(RequestsDestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
