import { TimeCardService } from './time-card.service';
import { CreateTimeCardDto, UpdateTimeCardDto } from './dto/time-card.dto';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdminGuard } from 'src/guard/admin.guard';

interface RequestWithUser {
  user: {
    email: string;
    role: string;
  };
}

@Controller('timecard')
export class TimeCardController {
  constructor(private readonly timeCardService: TimeCardService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get('timecards')
  async findAll() {
    try {
      const foundTimeCard = await this.timeCardService.findAll();
      return {
        success: true,
        message: 'Time cards found',
        data: foundTimeCard,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed finding time cards',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Get('timeCard')
  async findOne(@Body() id: string) {
    try {
      const foundTimeCard = await this.timeCardService.findOne(id);
      return {
        success: true,
        message: 'Time card found',
        data: foundTimeCard,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Time card not found',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('getUserCards')
  async findOneFromUser(@Req() req: RequestWithUser) {
    try {
      const foundTimeCards = await this.timeCardService.findAllfromUser(
        req.user.email,
      );

      return {
        success: true,
        message: 'Time cards found',
        data: foundTimeCards,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Time cards not found',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('create')
  async create(@Body() createData: CreateTimeCardDto) {
    try {
      const createdTimeCard = await this.timeCardService.create(createData);
      return {
        success: true,
        message: 'Time card created succesfully',
        data: createdTimeCard,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create time card',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body()
    updateData: UpdateTimeCardDto,
  ) {
    try {
      const updatedTimeCard = await this.timeCardService.update(id, updateData);
      return {
        success: true,
        message: 'Time card updated succesfully',
        data: updatedTimeCard,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed updating time card',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      const deletedTimeCard = await this.timeCardService.remove(id);
      return {
        success: true,
        message: 'Time card deleted succesfully',
        data: deletedTimeCard,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed deleting time card',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
