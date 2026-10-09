import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const createLogger = (name: string) => {
  const transport = new winston.transports.DailyRotateFile({
    filename: `logs/${name}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      transport,
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
};

export interface LoggerConfig {
  level: 'info' | 'error' | 'debug';
  dir: string;
}

export const defaultLogger = createLogger('app');