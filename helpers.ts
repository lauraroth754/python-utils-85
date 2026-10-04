import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeMB: number;
  maxFiles: number;
}

export const setupRotatingLogger = (options: LoggerOptions) => {
  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const logPath = path.join(options.logDir, 'app.log');

  return (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      if (stats.size > options.maxSizeMB * 1024 * 1024) {
        for (let i = options.maxFiles - 1; i > 0; i--) {
          const oldFile = `${logPath}.${i}`;
          const newFile = `${logPath}.${i + 1}`;
          if (fs.existsSync(oldFile)) fs.renameSync(oldFile, newFile);
        }
        fs.renameSync(logPath, `${logPath}.1`);
      }
    }

    fs.appendFileSync(logPath, logEntry);
  };
};