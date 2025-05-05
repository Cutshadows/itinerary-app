import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'itinerary-app',
      json: true,
      timestamp: true,
      colors: true,
      logLevels: ['error', 'warn', 'log', 'debug', 'verbose'],
    }),
  });
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,POST',
    preflightContinue: false,
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Kevin Itinerary API')
    .setDescription(
      "API for sorting and managing Kevin McCallister's itinerary.",
    )
    .setVersion('1.0')
    // .addBearerAuth()
    .addTag('itinerary')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: {
      docExpasion: true,
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
