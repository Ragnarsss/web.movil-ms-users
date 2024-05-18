import { TimeCardEntryService } from './time-card-entry.service';
import { TimeCardEntry } from './entities/time-card-entry.entity';
import { TimeCardEntryController } from './time-card-entry.controller';
import { TimeCard } from 'src/time-card/entities/time-card.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeCardEntry, TimeCard])],
  controllers: [TimeCardEntryController],
  providers: [TimeCardEntryService],
  exports: [TimeCardEntryService],
})
export class TimeCardEntryModule {}
