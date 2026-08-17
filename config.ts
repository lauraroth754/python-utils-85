import { createLogger, format, transports } from 'winston';
import { combine, timestamp, json } from 'logform';

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new transports.File({
            filename: 'combined.log',
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

export default logger;