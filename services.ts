import { createLogger, format, transports } from 'winston';
import { DailyRotateFile } from 'winston-daily-rotate-file';

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        logFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/%DATE%-results.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        })
    ]
});

export default logger;
