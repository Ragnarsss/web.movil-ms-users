import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardEntryController } from './time-card-entry.controller';
import { TimeCardEntryService } from './time-card-entry.service';

describe('TimeCardEntryController', () => {
  let controller: TimeCardEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCardEntryController],
      providers: [TimeCardEntryService],
    }).compile();

    controller = module.get<TimeCardEntryController>(TimeCardEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
