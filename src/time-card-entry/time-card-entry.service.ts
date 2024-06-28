import { entryType, timezone } from 'src/common/constants';
import { TimeCardService } from './../time-card/time-card.service';
import {
  CreateTimeCardEntryDto,
  MarkingEntryDto,
  TimeCardEntryFilterDto,
  UpdateTimeCardEntryDto,
} from './dto/time-card-entry.dto';
import { TimeCardEntry } from './entities/time-card-entry.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class TimeCardEntryService {
  constructor(
    @InjectRepository(TimeCardEntry)
    private tceRepo: Repository<TimeCardEntry>,
    private TimeCardService: TimeCardService,
  ) {}

  /**
   * Find all TimeCardEntries in the database
   * @returns A Promise with the TimeCardEntry array
   */
  async findAll(): Promise<TimeCardEntry[]> {
    try {
      const entries = await this.tceRepo.find();

      return entries;
    } catch (error) {
      throw new NotFoundException((error as any).detail);
    }
  }

  /**
   * Find a TimeCardEntry by its id in the database
   * @param id from the TimeCardEntry to find
   * @returns a Promise with the TimeCardEntry found
   */
  async findOne(id: number): Promise<TimeCardEntry> {
    try {
      const entry = await this.tceRepo.findOne({ where: { id } });

      if (!entry) {
        throw new NotFoundException(`Entry #${id} not found`);
      }
      return entry;
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  /**
   * Create a new TimeCardEntry in the database
   * @param createData Data to create a new TimeCardEntry according to the CreateTimeCardEntryDto
   * @returns A Promise with the TimeCardEntry created
   */
  async create(createData: CreateTimeCardEntryDto): Promise<TimeCardEntry> {
    try {
      // Buscar la TimeCard a la que se asociará la nueva entrada
      const timeCard = await this.TimeCardService.findOne(
        createData.timeCardId,
      );

      if (!timeCard) {
        throw new NotFoundException(
          `TimeCard #${createData.timeCardId} not found`,
        );
      }

      const newEntry = this.tceRepo.create(createData);

      newEntry.timeCard = timeCard;

      // Guardar la nueva TimeCardEntry con la relación
      return await this.tceRepo.save(newEntry);
    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        throw new ConflictException((error as any).detail);
    }
  }

  /**
   *
   * @param id from the TimeCardEntry to update
   * @param updateData data to update the TimeCardEntry according to the UpdateTimeCardEntryDto
   * @returns a Promise with the TimeCardEntry updated
   */
  async update(
    id: number,
    updateData: UpdateTimeCardEntryDto,
  ): Promise<TimeCardEntry> {
    const entry = await this.tceRepo.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    const dataToSave = this.tceRepo.merge(entry, updateData);

    try {
      return await this.tceRepo.save(dataToSave);
    } catch (error) {
      throw new ConflictException((error as any).detail);
    }
  }

  //La logica de este debe cambiar para que la entrada en cuestion no se borre de la base de datos y solo se desactive con un flag booleano
  /**
   * Remove a TimeCardEntry from the database
   * @param id from the TimeCardEntry to remove
   * @returns a Promise with the TimeCardEntry removed
   */
  async remove(id: number): Promise<TimeCardEntry> {
    const entry = await this.tceRepo.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    await this.tceRepo.delete(entry);

    return entry;
  }

  /**
   * Filter TimeCardEntries
   * @param filterData data to filter the TimeCardEntries according to the TimeCardEntryFilterDto
   * @returns a Promise with the filtered TimeCardEntries found
   */
  async filterEntries(
    filterData: TimeCardEntryFilterDto,
  ): Promise<[TimeCardEntry[], number]> {
    const { startDate, endDate } = filterData;

    try {
      return await this.tceRepo.findAndCount({
        where: {
          date: Between(filterData.startDate, filterData.endDate),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  async marking({ flag, id }: MarkingEntryDto): Promise<TimeCardEntry> {
    try {
      const entry = await this.findOne(id);
      const columnName = flag === entryType.IN ? 'entry' : 'exit';

      const dateToMark = moment.tz(timezone).format('YYYY-MM-DD HH:mm:ss');

      return await this.update(id, {
        [columnName]: dateToMark,
      });
    } catch (error) {}
  }
}
