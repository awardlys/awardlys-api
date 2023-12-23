import { Injectable } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class LoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    const transport = pino.transport({
      target: 'pino-pretty',
      options: { destination: 1 },
    });

    this.logger = pino(transport);
  }

  info(context: any, message: string) {
    this.logger.info(context, message);
  }

  error(context: any, message: string) {
    this.logger.error(context, message);
  }

  warn(context: any, message: string) {
    this.logger.warn(context, message);
  }

  debug(context: any, message: string) {
    this.logger.debug(context, message);
  }
}
