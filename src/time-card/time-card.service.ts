import { TimeCardEntry } from 'src/time-card-entry/entities/time-card-entry.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTimeCardDto, UpdateTimeCardDto } from './dto/time-card.dto';
import { TimeCard } from './entities/time-card.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimeCardService {
  constructor(
    @InjectRepository(User)
    private employeeRepository: Repository<User>,
    @InjectRepository(TimeCard)
    private timeCardRepository: Repository<TimeCard>,
    @InjectRepository(TimeCardEntry)
    private timeCardEntryRepository: Repository<TimeCardEntry>,
  ) {}

  async findAll() {
    try {
      return await this.timeCardRepository.find();
    } catch (error) {
      throw new NotFoundException(error.detail);
    }
  }

  async findOne(id: number) {
    try {
      const entry = await this.timeCardRepository.findOneBy({ id });
      if (!entry) {
        throw new NotFoundException(`Entry #${id} not found`);
      }
      return entry;
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }
  async create(createData: CreateTimeCardDto) {
    try {
      return await this.timeCardRepository.save(createData);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async update(id: number, updateData: UpdateTimeCardDto) {
    const entry = await this.timeCardRepository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    this.timeCardRepository.merge(entry, updateData);

    try {
      return await this.timeCardRepository.save(entry);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  //La logica de este debe cambiar para que la entrada en cuestion no se borre de la base de datos y solo se desactive con un flag booleano
  async remove(id: number) {
    const entry = await this.timeCardRepository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    await this.timeCardRepository.delete(entry);

    return entry;
  }
}
