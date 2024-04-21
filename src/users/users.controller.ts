import { Payload } from '@nestjs/microservices/decorators';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const foundUsers = await this.usersService.findAll();
      return {
        success: true,
        message: 'Users found',
        data: foundUsers,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found users',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Payload() id: number) {
    try {
      const foundUser = await this.usersService.findOne(id);
      return {
        success: true,
        message: 'User found',
        data: foundUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'User not found',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('create')
  async create(@Payload() payload: UserDto) {
    try {
      const createdUser = await this.usersService.create(payload);
      return {
        success: true,
        message: 'User created succesfully',
        data: createdUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Patch('/update')
  async update(
    @Payload() message: { userName: string; payload: UpdateUserDto },
  ) {
    try {
      const updateUser = await this.usersService.update(
        message.userName,
        message.payload,
      );
      console.log('user updated');
      return {
        success: true,
        message: 'User updated succesfully',
        data: updateUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Delete()
  async delete(@Payload() userName: string) {
    try {
      const deletedUser = await this.usersService.delete(userName);
      return {
        success: true,
        message: 'User deleted succesfully',
        data: deletedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
