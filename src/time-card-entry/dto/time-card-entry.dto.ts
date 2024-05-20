import { TimeCard } from './../../time-card/entities/time-card.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class TimeEntryDto {}

export class CreateTimeCardEntryDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly timeCardId: number;
}

export class UpdateTimeCardEntryDto extends PartialType(
  CreateTimeCardEntryDto,
) {}
