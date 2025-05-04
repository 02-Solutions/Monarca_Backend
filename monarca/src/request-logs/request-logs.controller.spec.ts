import { Test, TestingModule } from '@nestjs/testing';
import { RequestLogsController } from './request-logs.controller';
import { RequestLogsService } from './request-logs.service';

describe('RequestLogsController', () => {
  let controller: RequestLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestLogsController],
      providers: [RequestLogsService],
    }).compile();

    controller = module.get<RequestLogsController>(RequestLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
