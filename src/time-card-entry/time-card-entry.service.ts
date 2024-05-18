import {
  CreateTimeCardEntryDto,
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
import { Repository } from 'typeorm';

@Injectable()
export class TimeCardEntryService {
  constructor(
    @InjectRepository(TimeCardEntry)
    private tceRepo: Repository<TimeCardEntry>,
  ) {}

  async findAll() {
    try {
      return await this.tceRepo.find();
    } catch (error) {
      throw new NotFoundException(error.detail);
    }
  }

  async findOne(id: number) {
    try {
      console.log(id);

      const entry = await this.tceRepo.findOne({ where: { id } });
      console.log(entry);

      if (!entry) {
        throw new NotFoundException(`Entry #${id} not found`);
      }
      return entry;
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }
  async create(createData: CreateTimeCardEntryDto) {
    try {
      // Buscar la TimeCard a la que se asociará la nueva entrada
      const timeCard = await this.tceRepo.findOneBy({
        id: createData.timeCardId,
      });

      if (!timeCard) {
        throw new NotFoundException(
          `TimeCard #${createData.timeCardId} not found`,
        );
      }

      const newEntry = this.tceRepo.create(createData);

      await this.tceRepo.save(newEntry);

      // Guardar la nueva TimeCardEntry con la relación
      await this.tceRepo.save(newEntry);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async update(id: number, updateData: UpdateTimeCardEntryDto) {
    const entry = await this.tceRepo.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    this.tceRepo.merge(entry, updateData);

    try {
      return await this.tceRepo.save(entry);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  //La logica de este debe cambiar para que la entrada en cuestion no se borre de la base de datos y solo se desactive con un flag booleano
  async remove(id: number) {
    const entry = await this.tceRepo.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    await this.tceRepo.delete(entry);

    return entry;
  }
}
