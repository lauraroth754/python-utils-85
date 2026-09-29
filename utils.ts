import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

export const createRollingLogger = (filename: string): Logger => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json()
    ),
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        filename: `logs/${filename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });
};

export const logger = createRollingLogger('python-utils-85');