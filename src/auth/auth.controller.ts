import { AuthGuard } from 'src/guard/auth.guard';
import { CreateUserDto, UserLoginDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  login(@Body() loginDto: UserLoginDto) {
    11;
    return this.authService.login(loginDto);
  }
  1;
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req,
  ) {
    return req.user;
  }

  @Post('update-jwt')
  async updateJWT(@Payload() message: { email: string; token: string }) {
    try {
      const updateUser = await this.authService.refresh(
        message.email,
        message.token,
      );
      return {
        success: true,
        message: 'JWT updated succesfully',
        data: updateUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update JWT',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
