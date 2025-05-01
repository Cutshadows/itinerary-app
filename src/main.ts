import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  //   app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //   app.useGlobalFilters(new HttpExceptionFilter());
  //   app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
