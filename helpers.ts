import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSize: number;
  maxFiles: number;
}

export const setupLogger = (config: LoggerConfig): (message: string) => void => {
  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }

  const logPath = path.join(config.logDir, 'app.log');

  return (message: string): void => {
    if (fs.existsSync(logPath) && fs.statSync(logPath).size > config.maxSize) {
      for (let i = config.maxFiles - 1; i > 0; i--) {
        const oldFile = path.join(config.logDir, `app.${i}.log`);
        const newFile = path.join(config.logDir, `app.${i + 1}.log`);
        if (fs.existsSync(oldFile)) fs.renameSync(oldFile, newFile);
      }
      fs.renameSync(logPath, path.join(config.logDir, 'app.1.log'));
    }

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logPath, logEntry);
  };
};