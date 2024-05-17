import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardService } from './time-card.service';

describe('TimeCardService', () => {
  let service: TimeCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeCardService],
    }).compile();

    service = module.get<TimeCardService>(TimeCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
