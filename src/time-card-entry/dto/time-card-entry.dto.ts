import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class TimeEntryDto {}

export class CreateTimeCardEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly timeCardId: number;

  @IsDate()
  morningStart?: Date;

  @IsDate()
  morningEnd?: Date;

  @IsDate()
  afternoonStart?: Date;

  @IsDate()
  afternoonEnd?: Date;

  @IsDate()
  overtimeStart?: Date;

  @IsDate()
  overtimEnd?: Date;

  @IsNumber()
  totalHours?: number;
}

export class UpdateTimeCardEntryDto extends PartialType(
  CreateTimeCardEntryDto,
) {}

export class TimeCardEntryFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;
}
