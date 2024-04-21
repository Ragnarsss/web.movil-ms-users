import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';
import { User } from './entities/user.entity';
import { UpdateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByUserName(userName: string) {
    const user = await this.userRepo.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException(`User ${userName} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    return user || null;
  }

  async create(payload: UserDto) {
    const newUser = this.userRepo.create(payload);

    const hashPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashPassword;

    try {
      const createdUser = await this.userRepo.save(newUser);
      return { user: createdUser, password: newUser.password };
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async update(email: string, payload: UpdateUserDto) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    this.userRepo.merge(user, payload);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      throw new ConflictException(error.detail);
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
    const user = await this.findByEmail(email);

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
