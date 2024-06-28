import { CreateUserDto, UserLoginDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { tokenType } from 'src/common/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

      const payload = {
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(
        {
          ...payload,
          type: tokenType.ACCESS,
        },
        {
          expiresIn: this.configService.get('JWT_EXPIRATION'),
        },
      );

      const refreshToken = await this.jwtService.signAsync({
        ...payload,
        type: tokenType.REFRESH,
      });

      const response = {
        statusCode: 200,
        message: 'Login successful',
        success: true,
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          email: user.email,
          role: user.role,
        },
      };

      return response;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return {
          statusCode: 401,
          message: error.message,
          success: false,
        };
      }
      return {
        statusCode: 500,
        message: 'Internal server error',
        success: false,
      };
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET, // Asegúrate de usar la clave secreta correcta para los refresh tokens
      });

      const user = await this.usersService.findByEmail(payload.email); // Suponiendo que existe un servicio para buscar usuarios

      const newToken = this.jwtService.sign(
        {
          username: user.userName,
          sub: user.id,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );
      return newToken;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
