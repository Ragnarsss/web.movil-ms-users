import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class TimeCardDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  period_start: Date;

  @ApiProperty()
  period_end: Date;
}

export class CreateTimeCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  period_start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  period_end: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateTimeCardDto extends PartialType(TimeCardDto) {}
