import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardController } from './time-card.controller';
import { TimeCardService } from './time-card.service';

describe('TimeCardController', () => {
  let controller: TimeCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCardController],
      providers: [TimeCardService],
    }).compile();

    controller = module.get<TimeCardController>(TimeCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
