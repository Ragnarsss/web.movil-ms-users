import { AuthGuard } from 'src/guard/auth.guard';
import {
  CreateTimeCardEntryDto,
  MarkingEntryDto,
  TimeCardEntryFilterDto,
  UpdateTimeCardEntryDto,
} from './dto/time-card-entry.dto';
import { TimeCardEntryService } from './time-card-entry.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Time card entry')
@Controller('timecardentry')
export class TimeCardEntryController {
  constructor(private tceService: TimeCardEntryService) {}

  @Get('timecardentries')
  async findAll() {
    try {
      const foundEntries = await this.tceService.findAll();

      return {
        success: true,
        message: 'Entries found',
        data: foundEntries,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found entries',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const foundEntry = await this.tceService.findOne(id);
      return {
        success: true,
        message: 'Entry found',
        data: foundEntry,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Entry not found',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('create')
  async create(@Body() createData: CreateTimeCardEntryDto) {
    try {
      const createdEntry = await this.tceService.create(createData);
      return {
        success: true,
        message: 'Entry created succesfully',
        data: createdEntry,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create entry',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body()
    updateData: UpdateTimeCardEntryDto,
  ) {
    try {
      const updatedEntry = await this.tceService.update(id, updateData);
      return {
        success: true,
        message: 'Entry updated succesfully',
        data: updatedEntry,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update entry',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    try {
      const deletedEntry = await this.tceService.remove(id);
      return {
        success: true,
        message: 'Entry deleted succesfully',
        data: deletedEntry,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete entry',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('filterTimeCardEntries')
  async filterEntries(@Body() filterData: TimeCardEntryFilterDto) {
    try {
      const filteredEntries = await this.tceService.filterEntries(filterData);

      return {
        success: true,
        message: 'Entries filtered',
        data: filteredEntries,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to filter entries',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('marking')
  @UseGuards(AuthGuard)
  async marking(@Body() markingData: MarkingEntryDto) {
    try {
      const markedEntry = await this.tceService.marking(markingData);
      return {
        success: true,
        message: 'Entry marked',
        data: markedEntry,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to mark entry',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
