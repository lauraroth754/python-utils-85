import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFile: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFile = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    if (!fs.existsSync(this.currentFile)) return;

    const stats = fs.statSync(this.currentFile);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.logDir, `app.${i}.log`);
      const newPath = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }

    fs.renameSync(this.currentFile, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    this.rotate();
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFile, formatted, 'utf-8');
    console.log(formatted.trim());
  }

  public info(message: string): void {
    this.log('INFO', message);
  }

  public warn(message: string): void {
    this.log('WARN', message);
  }

  public error(message: string): void {
    this.log('ERROR', message);
  }
}