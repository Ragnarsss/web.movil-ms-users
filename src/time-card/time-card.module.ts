import { TimeCardEntry } from 'src/time-card-entry/entities/time-card-entry.entity';
import { User } from 'src/users/entities/user.entity';
import { TimeCard } from './entities/time-card.entity';
import { TimeCardController } from './time-card.controller';
import { TimeCardService } from './time-card.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeCard, User, TimeCardEntry]),
    UsersModule,
  ],
  controllers: [TimeCardController],
  providers: [TimeCardService, UsersService],
  exports: [TimeCardModule],
})
export class TimeCardModule {}
