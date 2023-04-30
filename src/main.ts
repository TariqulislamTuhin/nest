import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      disableErrorMessages:
        process.env.NODE_MODE === 'PRODUCTION' ? true : false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Nest Test API')
    .setDescription('This is a test api in nestJS')
    .setVersion('1.0.0')
    .addTag('NestJS Test API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
