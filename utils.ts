import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, errors } = format;

export const setupLogger = (logDir: string = 'logs'): Logger => {
  return createLogger({
    level: 'info',
    format: combine(
      errors({ stack: true }),
      timestamp(),
      json()
    ),
    transports: [
      new transports.DailyRotateFile({
        dirname: logDir,
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d'
      }),
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      })
    ]
  });
};

export const logger = setupLogger();