import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardEntryService } from './time-card-entry.service';

describe('TimeCardEntryService', () => {
  let service: TimeCardEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeCardEntryService],
    }).compile();

    service = module.get<TimeCardEntryService>(TimeCardEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
