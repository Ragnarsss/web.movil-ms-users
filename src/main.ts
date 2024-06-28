import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('config.app.port');

  app.enableCors();

  const swaggerDocsConfig = new DocumentBuilder()
    .setTitle('MarcApp Backend API Documentation')
    .setDescription('Operative monolitic backend to do product demo')
    .setVersion('1.0')
    .build();

  const swaggerDocs = SwaggerModule.createDocument(app, swaggerDocsConfig);
  SwaggerModule.setup('api/v1/docs', app, swaggerDocs);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: process.env.ENVIRONMENT === 'production',
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(9100);
  console.log('Auth Microservice is listening');
}
bootstrap();
