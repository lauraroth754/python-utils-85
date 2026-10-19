import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  filename: string;
  maxSizeBytes: number;
  maxBackups: number;
}

export class RotatingLogger {
  private path: string;
  private maxSize: number;
  private maxBackups: number;

  constructor(config: LoggerConfig) {
    this.path = config.filename;
    this.maxSize = config.maxSizeBytes;
    this.maxBackups = config.maxBackups;
  }

  private rotate(): void {
    for (let i = this.maxBackups - 1; i > 0; i--) {
      const oldFile = `${this.path}.${i}`;
      const newFile = `${this.path}.${i + 1}`;
      if (fs.existsSync(oldFile)) fs.renameSync(oldFile, newFile);
    }
    fs.renameSync(this.path, `${this.path}.1`);
  }

  public log(message: string): void {
    if (fs.existsSync(this.path)) {
      const stats = fs.statSync(this.path);
      if (stats.size >= this.maxSize) this.rotate();
    }

    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.path, entry, 'utf8');
  }
}