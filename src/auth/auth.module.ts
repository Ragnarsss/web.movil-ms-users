import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigModule, ConfigType } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { secret, expiresIn } = configService.jwt;
        return {
          secret,
          signOptions: { expiresIn: Number(expiresIn) },
        };
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
