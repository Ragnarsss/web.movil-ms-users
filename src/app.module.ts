import { AuthModule } from './auth/auth.module';
import config from './config';
import { TimeCardEntry } from './time-card-entry/entities/time-card-entry.entity';
import { TimeCardEntryModule } from './time-card-entry/time-card-entry.module';
import { TimeCard } from './time-card/entities/time-card.entity';
import { TimeCardModule } from './time-card/time-card.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([User, TimeCard, TimeCardEntry]),
    AuthModule,
    TimeCardModule,
    TimeCardEntryModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
