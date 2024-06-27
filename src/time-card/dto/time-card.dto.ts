import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class TimeCardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  periodStart: Date;

  @ApiProperty()
  periodEnd: Date;
}

export class CreateTimeCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  periodStart: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  periodEnd: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateTimeCardDto extends PartialType(TimeCardDto) {}
