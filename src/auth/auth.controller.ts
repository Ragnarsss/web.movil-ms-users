import { CreateUserDto, UserLoginDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('update-jwt')
  @UseGuards(RefreshTokenGuard)
  async updateJWT(@Request() req) {
    try {
      const updatedToken = await this.authService.refresh(req.refreshToken);
      return {
        statusCode: 200,
        success: true,
        message: 'JWT updated succesfully',
        data: updatedToken,
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
