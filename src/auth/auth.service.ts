import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, UserDto, UserLoginDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(userDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(userDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersService.create(userDto);
  }

  async login({ email, password }: UserLoginDto) {
    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new NotFoundException(
          'No existe una cuenta asociada a este correo',
        );
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
      });

      const refreshToken = await this.jwtService.signAsync({
        randomNumber: Math.random(),
        randomDate: new Date(),
      });

      const response = {
        statusCode: 200,
        message: 'Login successful',
        success: true,
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        },
      };

      return response;
    } catch (error) {
      return {
        statusCode: 401,
        message: error.message,
        success: false,
      };
    }
  }

  async refresh(email: string, refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken);
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new NotFoundException(`User ${payload.username} not found`);
      }

      return {
        access_token: this.jwtService.sign({
          username: user.userName,
          sub: user.id,
        }),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
