import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);

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
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
