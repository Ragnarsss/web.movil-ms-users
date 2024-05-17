import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateTimeCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  period_start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  period_end: Date;
}

export class UpdateTimeCardDto extends PartialType(CreateTimeCardDto) {}
