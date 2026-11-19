import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSize: number;
  maxFiles: number;
}

export const setupLogger = (options: LoggerOptions) => {
  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  return (message: string) => {
    const logFile = path.join(options.logDir, 'app.log');
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > options.maxSize) {
        for (let i = options.maxFiles - 1; i >= 0; i--) {
          const oldPath = i === 0 ? logFile : `${logFile}.${i}`;
          const newPath = `${logFile}.${i + 1}`;
          if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
        }
      }
    }

    fs.appendFileSync(logFile, entry);
  };
};