import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: 'https://instituto-etc.netlify.app',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Etc Api')
    .setDescription('The etc API description')
    .setVersion('1.0')
    .addTag('etc')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
