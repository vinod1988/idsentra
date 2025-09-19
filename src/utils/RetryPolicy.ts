import type { IDSLogger } from '../core/IDSLogger.js';

export interface RetryPolicyOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  logger?: IDSLogger;
}

/**
 * Retry policy for handling transient failures
 */
export class RetryPolicy {
  private readonly maxRetries: number;
  private readonly initialDelay: number;
  private readonly maxDelay: number;
  private readonly backoffFactor: number;
  private readonly logger: IDSLogger | Console;

  constructor(options: RetryPolicyOptions = {}) {
    this.maxRetries = options.maxRetries ?? 3;
    this.initialDelay = options.initialDelay ?? 1000; // 1 second
    this.maxDelay = options.maxDelay ?? 30000; // 30 seconds
    this.backoffFactor = options.backoffFactor ?? 2;
    this.logger = options.logger ?? console;
  }

  /**
   * Execute an operation with retry logic
   * @param operation - The operation to execute
   * @param shouldRetry - Optional function to determine if an error should be retried
   */
  async execute<T>(
    operation: () => Promise<T>,
    shouldRetry: (error: unknown, attempt: number) => boolean = this.defaultShouldRetry
  ): Promise<T> {
    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt <= this.maxRetries) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        attempt++;

        if (attempt > this.maxRetries || !shouldRetry(error, attempt)) {
          break;
        }

        const delay = this.calculateBackoff(attempt);
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        this.logger.error(`Attempt ${attempt} failed: ${errorMessage}`,
          { error: errorMessage, stack: errorStack }
        );

        await this.delay(delay);
      }
    }

    throw lastError || new Error('Operation failed with unknown error');
  }

  /**
   * Default retry condition
   */
  private defaultShouldRetry(error: unknown): boolean {
    // Type guard to check if error has a response property
    const isErrorWithResponse = (e: unknown): e is { response: { status: number } } => {
      return typeof e === 'object' && e !== null && 'response' in e && 
             typeof (e as { response: unknown }).response === 'object' && 
             (e as { response: { status: unknown } }).response !== null &&
             'status' in (e as { response: { status: unknown } }).response &&
             typeof (e as { response: { status: number } }).response.status === 'number';
    };
    
    // If we can't determine the error type, retry by default
    if (!isErrorWithResponse(error)) return true;
    // Retry on network errors, 5xx server errors, and rate limiting
    if (!error.response) return true; // Network error
    
    const status = error.response.status;
    return status >= 500 || status === 429; // 5xx or Too Many Requests
  }

  /**
   * Calculate backoff delay with exponential backoff and jitter
   */
  private calculateBackoff(attempt: number): number {
    const backoff = Math.min(
      this.initialDelay * Math.pow(this.backoffFactor, attempt - 1),
      this.maxDelay
    );
    
    // Add jitter (randomness) to prevent thundering herd problem
    const jitter = Math.random() * backoff * 0.2; // Up to 20% jitter
    return Math.min(Math.floor(backoff + jitter), this.maxDelay);
  }

  /**
   * Delay execution for a given number of milliseconds
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
