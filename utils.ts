import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log',
            level: 'info',
            maxsize: 1000000,
            maxFiles: '14d',
            tailable: true
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            maxsize: 1000000,
            maxFiles: '14d',
            tailable: true
        }),
    ],
});

export default logger;