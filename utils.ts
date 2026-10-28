import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  filename: string;
  maxSizeMb: number;
}

export const setupLogger = (config: LoggerConfig) => {
  const filePath = path.join(config.logDir, config.filename);

  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }

  return (message: string) => {
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > config.maxSizeMb * 1024 * 1024) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.renameSync(filePath, `${filePath}.${timestamp}`);
    }

    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(filePath, entry);
  };
};

export const logger = setupLogger({
  logDir: './logs',
  filename: 'app.log',
  maxSizeMb: 5
});