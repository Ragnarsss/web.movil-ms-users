import { TimeCardController } from './time-card.controller';
import { TimeCardService } from './time-card.service';
import { TimeCard } from './entities/time-card.entity';
import { User } from 'src/users/entities/user.entity';
import { TimeCardEntry } from 'src/time-card-entry/entities/time-card-entry.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TimeCard, User, TimeCardEntry])],
  controllers: [TimeCardController],
  providers: [TimeCardService],
  exports: [TimeCardService],
})
export class TimeCardModule {}
