import { TimeCard } from 'src/time-card/entities/time-card.entity';
import { TimeCardModule } from 'src/time-card/time-card.module';
import { TimeCardService } from 'src/time-card/time-card.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TimeCardEntry } from './entities/time-card-entry.entity';
import { TimeCardEntryController } from './time-card-entry.controller';
import { TimeCardEntryService } from './time-card-entry.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeCardEntry, TimeCard, User]),
    TimeCardModule,
    UsersModule,
  ],
  controllers: [TimeCardEntryController],
  providers: [TimeCardEntryService, TimeCardService],
  exports: [TimeCardEntryService],
})
export class TimeCardEntryModule {}
