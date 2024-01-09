import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);

  app.setGlobalPrefix(process.env.API_PREFIX_PATH);

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_API_TITLE)
    .setDescription(process.env.SWAGGER_API_DESCRIPTION)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .setBasePath(process.env.API_PREFIX_PATH)
    .addTag('accounts')
    .addTag('awards')
    .addTag('categories')
    .addTag('games')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.API_PREFIX_PATH, app, document);

  app.enableCors();
  app.useLogger(logger);
  app.use(
    morgan('common', {
      stream: {
        write: (message) => {
          logger.log(message);
        },
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
