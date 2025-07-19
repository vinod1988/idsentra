/* eslint-disable no-console */

/**
 * Logger interface for consistent logging across the application
 */
export interface IDSLogger {
  info(message: string, meta?: unknown): void;
  error(message: string, error?: unknown): void;
  warn(message: string, meta?: unknown): void;
  debug(message: string, meta?: unknown): void;
  child(metadata: Record<string, unknown>): IDSLogger;
}

/**
 * Default console-based logger implementation
 */
export class ConsoleLogger implements IDSLogger {
  protected context: Record<string, unknown>;

  constructor(context: Record<string, unknown> = {}) {
    this.context = { ...context };
  }

  /**
   * Format a log message with timestamp and metadata
   * @protected - Allow subclasses to override this method
   */
  protected formatMessage(level: string, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const context = Object.keys(this.context).length ? ` ${JSON.stringify(this.context)}` : '';
    const metadata = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}]${context} ${message}${metadata}`;
  }

  info(message: string, meta?: unknown): void {
    console.log(this.formatMessage('INFO', message, meta));
  }

  error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      console.error(this.formatMessage('ERROR', `${message} - ${error.message}`), error.stack || '');
    } else {
      console.error(this.formatMessage('ERROR', message, error));
    }
  }

  warn(message: string, meta?: unknown): void {
    console.warn(this.formatMessage('WARN', message, meta));
  }

  debug(message: string, meta?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }

  child(metadata: Record<string, unknown>): IDSLogger {
    return new ConsoleLogger({ ...this.context, ...metadata });
  }
}

/**
 * Emoji map interface
 */
export interface EmojiMap {
  INFO: string;
  WARN: string;
  ERROR: string;
  DEBUG: string;
  SUCCESS: string;
  [key: string]: string; // Allow custom log levels
}

/**
 * Emoji logger options interface
 */
export interface EmojiLoggerOptions {
  emojis?: Partial<EmojiMap>; // Allow partial overrides of default emojis
  showTimestamp?: boolean; // Option to show/hide timestamps
  showLevel?: boolean; // Option to show/hide log levels
}

/**
 * Logger that adds emoji prefixes to log messages
 */
export class EmojiLogger extends ConsoleLogger {
  private emojiMap: EmojiMap;
  private showTimestamp: boolean;
  private showLevel: boolean;

  constructor(context: Record<string, unknown> = {}, options: EmojiLoggerOptions = {}) {
    super(context);
    
    // Default emoji map
    this.emojiMap = {
      INFO: 'ℹ️',
      WARN: '⚠️',
      ERROR: '❌',
      DEBUG: '🐛',
      SUCCESS: '✅',
    };

    // Apply custom emojis if provided
    if (options.emojis) {
      // Filter out undefined values to maintain type safety
      const validEmojis = Object.entries(options.emojis).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);
      
      this.emojiMap = { ...this.emojiMap, ...validEmojis };
    }

    this.showTimestamp = options.showTimestamp ?? true;
    this.showLevel = options.showLevel ?? true;
  }

  /**
   * Update emoji for a specific log level
   * @param level Log level to update
   * @param emoji New emoji to use
   */
  public setEmoji(level: string, emoji: string): void {
    this.emojiMap[level.toUpperCase()] = emoji;
  }

  protected formatMessage(level: string, message: string, meta?: unknown): string {
    const emoji = this.emojiMap[level] || '📝';
    const parts = [emoji];
    
    if (this.showTimestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }
    
    if (this.showLevel) {
      parts.push(`[${level}]`);
    }
    
    const context = Object.keys(this.context).length > 0 ? ` ${JSON.stringify(this.context)}` : '';
    const metadata = meta ? ` ${JSON.stringify(meta)}` : '';
    
    return `${parts.join(' ')}${context} ${message}${metadata}`.trim();
  }

  /**
   * Log a success message with a checkmark emoji
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  success(message: string, meta?: unknown): void {
    console.log(this.formatMessage('SUCCESS', message, meta));
  }

  /**
   * Log a message with a custom log level and emoji
   * @param level Custom log level name
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  logCustom(level: string, message: string, meta?: unknown): void {
    // Ensure the level has an emoji
    if (!this.emojiMap[level.toUpperCase()]) {
      this.setEmoji(level, '📝'); // Default emoji for custom levels
    }
    console.log(this.formatMessage(level.toUpperCase(), message, meta));
  }
}

// Default logger instance
export const logger: IDSLogger = new EmojiLogger();
