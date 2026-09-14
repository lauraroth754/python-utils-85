import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  filePath: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export const setupLogger = (config: LoggerConfig): (message: string) => void => {
  const rotate = (): void => {
    if (fs.existsSync(config.filePath) && fs.statSync(config.filePath).size > config.maxSizeBytes) {
      for (let i = config.maxFiles - 1; i > 0; i--) {
        const oldPath = `${config.filePath}.${i}`;
        const newPath = `${config.filePath}.${i + 1}`;
        if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
      }
      fs.renameSync(config.filePath, `${config.filePath}.1`);
    }
  };

  return (message: string): void => {
    rotate();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(config.filePath, entry);
  };
};

export const logger = setupLogger({
  filePath: path.join(process.cwd(), 'app.log'),
  maxSizeBytes: 1024 * 1024 * 5,
  maxFiles: 3
});