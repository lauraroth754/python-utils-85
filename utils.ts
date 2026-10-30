import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.json()
);

export const setupLogger = (filename: string): Logger => {
  return createLogger({
    level: 'info',
    format: logFormat,
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple())
      }),
      new (transports as any).DailyRotateFile({
        filename: `logs/${filename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });
};
