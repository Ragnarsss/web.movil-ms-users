import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import config from './config';

import { AuthModule } from './auth/auth.module';
import { TimeCardEntryModule } from './time-card-entry/time-card-entry.module';
import { TimeCardModule } from './time-card/time-card.module';
import { UsersModule } from './users/users.module';

import { TimeCardEntry } from './time-card-entry/entities/time-card-entry.entity';
import { TimeCard } from './time-card/entities/time-card.entity';
import { User } from './users/entities/user.entity';
import { MapService } from './map/map.service';
import { MapController } from './map/map.controller';

@Module({
  imports: [
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
    UsersModule,
    TimeCardModule,
    TimeCardEntryModule,
  ],
  exports: [TypeOrmModule],
  providers: [MapService],
  controllers: [MapController],
})
export class AppModule {}
