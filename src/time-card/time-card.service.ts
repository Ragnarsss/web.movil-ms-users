import { UsersService } from 'src/users/users.service';
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
    @InjectRepository(TimeCard)
    private timeCardRepository: Repository<TimeCard>,
    private usersService: UsersService,
  ) {}

  async findAll() {
    try {
      return await this.timeCardRepository.find({
        relations: ['entries', 'user'],
      });
    } catch (error) {
      throw new NotFoundException((error as any).detail);
    }
  }

  async findOne(id: number) {
    try {
      const foundCard = await this.timeCardRepository.findOne({
        where: { id },
        relations: ['entries', 'user'],
      });

      console.log(foundCard, 'entry');

      if (!foundCard) {
        throw new NotFoundException(`Entry #${id} not found`);
      }
      return foundCard;
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  async create(createData: CreateTimeCardDto) {
    try {
      const user = await this.usersService.findOne(createData.userId);

      if (!user) {
        throw new NotFoundException(`User ${createData.userId} not found`);
      }

      const newTimeCard = await this.timeCardRepository.create({
        period_start: createData.period_start,
        period_end: createData.period_end,
      });

      newTimeCard.user = user;

      return await this.timeCardRepository.save(newTimeCard);
    } catch (error) {
      throw new ConflictException((error as any).detail);
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
      throw new ConflictException((error as any).detail);
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
