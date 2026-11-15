import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  minLevel?: LogLevel;
}

const LOG_LEVEL_WEIGHTS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private minLevel: LogLevel;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.minLevel = options.minLevel ?? 'INFO';
    this.currentFilePath = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_WEIGHTS[level] >= LOG_LEVEL_WEIGHTS[this.minLevel];
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const source = path.join(this.logDir, `app.${i}.log`);
      const target = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(source)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(source);
        } else {
          fs.renameSync(source, target);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: LogLevel, message: string): void {
    if (!this.shouldLog(level)) return;
    this.rotateIfNeeded();

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFilePath, logEntry, 'utf-8');
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