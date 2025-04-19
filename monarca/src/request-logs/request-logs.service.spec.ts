import { Test, TestingModule } from '@nestjs/testing';
import { RequestLogsService } from './request-logs.service';

describe('RequestLogsService', () => {
  let service: RequestLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestLogsService],
    }).compile();

    service = module.get<RequestLogsService>(RequestLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
