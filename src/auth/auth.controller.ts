import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, UserLoginDto } from 'src/users/dto/user.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() userDto: UserDto) {
    console.log(userDto);
    return await this.authService.register(userDto);
  }

  @Post('login')
  login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req,
  ) {
    return req.user;
  }
}
