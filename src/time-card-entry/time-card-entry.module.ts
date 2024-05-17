import { Module } from '@nestjs/common';
import { TimeCardEntryService } from './time-card-entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeCardEntry } from './entities/time-card-entry.entity';
import { TimeCardEntryController } from './time-card-entry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeCardEntry])],
  controllers: [TimeCardEntryController],
  providers: [TimeCardEntryService],
  exports: [TimeCardEntryService],
})
export class TimeCardEntryModule {}
