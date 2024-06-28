import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { entryType } from 'src/common/constants';

export class TimeEntryDto {}

export class MarkingEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  flag: entryType;

  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class CreateTimeCardEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly timeCardId: string;

  @IsDate()
  @IsOptional()
  entry?: Date;

  @IsDate()
  @IsOptional()
  exit?: Date;
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
