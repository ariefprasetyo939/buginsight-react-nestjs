/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/v1/';
  app.setGlobalPrefix(globalPrefix);
  
  //swagger config
  const config = new DocumentBuilder();
  config.setTitle('API Gateway');
  config.setDescription('API Gateway documentation');
  config.setVersion('1.0');
  config.addBearerAuth(); //because we'll be using JWT auth
  config.build();

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api/documentation', app, document);

  //pipe validation
  app.useGlobalPipes();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
