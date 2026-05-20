
type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  environment: {
    url: string;
    userAgent: string;
    platform: string;
  };
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      environment: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      },
    };
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const entry = this.createEntry(level, message, context);
    this.logs.push(entry);

    // In a real app, you might send this to a backend or logging service
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    
    console[consoleMethod](
      `[${entry.timestamp}] [${level.toUpperCase()}] ${message}`,
      { context: entry.context, environment: entry.environment }
    );
  }

  public info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  public warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  public error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

export const logger = Logger.getInstance();
