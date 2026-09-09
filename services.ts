import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  filepath: string;
  maxBytes: number;
  backupCount: number;
}

export class RotatingLogger {
  private filepath: string;
  private maxBytes: number;
  private backupCount: number;
  private stream!: fs.WriteStream;

  constructor(config: LoggerConfig) {
    this.filepath = path.resolve(config.filepath);
    this.maxBytes = config.maxBytes;
    this.backupCount = config.backupCount;
    this.initStream();
  }

  private initStream(): void {
    const dir = path.dirname(this.filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.stream = fs.createWriteStream(this.filepath, { flags: 'a', encoding: 'utf8' });
  }

  private rotate(): void {
    this.stream.end();

    for (let i = this.backupCount - 1; i >= 1; i--) {
      const oldPath = `${this.filepath}.${i}`;
      const newPath = `${this.filepath}.${i + 1}`;
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    }

    if (fs.existsSync(this.filepath)) {
      fs.renameSync(this.filepath, `${this.filepath}.1`);
    }

    this.initStream();
  }

  public log(message: string, level: string = 'INFO'): void {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}
`;
    const entryBytes = Buffer.byteLength(formatted, 'utf8');

    try {
      if (fs.existsSync(this.filepath)) {
        const stats = fs.statSync(this.filepath);
        if (stats.size + entryBytes > this.maxBytes) {
          this.rotate();
        }
      }
    } catch {
      this.initStream();
    }

    this.stream.write(formatted);
  }
}