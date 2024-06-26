import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    try {
      return await this.userRepo.find();
    } catch (error) {
      throw new NotFoundException((error as any).detail);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  async findByUserName(userName: string) {
    try {
      const user = await this.userRepo.findOneBy({ userName });
      if (!user) {
        throw new NotFoundException(`User ${userName} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepo.findOneBy({ email });

      return user;
    } catch (error) {
      throw new InternalServerErrorException((error as any).detail);
    }
  }

  async create(createData: CreateUserDto) {
    try {
      const newUser: User = this.userRepo.create(createData);

      // const hashPassword = await bcrypt.hash(newUser.password, 10);

      // newUser.password = hashPassword;

      newUser.password = await bcrypt.hash(newUser.password, 10);

      return await this.userRepo.save(newUser);
    } catch (error) {
      throw new ConflictException((error as any).detail);
    }
  }

  async update(id: number, updateData: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.userRepo.merge(user, updateData);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      throw new ConflictException((error as any).detail);
    }
  }

  async delete(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    await this.userRepo.delete(user);

    return user;
  }

  async recoverPassword(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    console.log(user);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const generatedPassword = generator.generate({
      length: 8,
      uppercase: true,
      numbers: true,
      symbols: '*',
      strict: true,
    });

    const hashPassword = await bcrypt.hash(generatedPassword, 10);

    user.password = hashPassword;

    await this.userRepo.save(user).catch((error) => {
      throw new ConflictException(error.detail);
    });

    return generatedPassword;
  }
}
