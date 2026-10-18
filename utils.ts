import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogMetadata {
  [key: string]: any;
}

export const logInfo = (message: string, meta?: LogMetadata) => logger.info(message, meta);
export const logError = (message: string, meta?: LogMetadata) => logger.error(message, meta);