import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  logDir: string;
  filename: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export class RotatingLogger {
  private readonly logPath: string;

  constructor(private config: LoggerConfig) {
    this.logPath = path.join(config.logDir, config.filename);
    if (!fs.existsSync(config.logDir)) {
      fs.mkdirSync(config.logDir, { recursive: true });
    }
  }

  public log(message: string): void {
    this.rotate();
    const entry = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(this.logPath, entry);
  }

  private rotate(): void {
    if (!fs.existsSync(this.logPath)) return;

    const stats = fs.statSync(this.logPath);
    if (stats.size < this.config.maxSizeBytes) return;

    for (let i = this.config.maxFiles - 1; i > 0; i--) {
      const oldPath = `${this.logPath}.${i}`;
      const newPath = `${this.logPath}.${i + 1}`;
      if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
    }
    fs.renameSync(this.logPath, `${this.logPath}.1`);
  }
}