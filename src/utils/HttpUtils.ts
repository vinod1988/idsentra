import type { Request, Response, NextFunction } from 'express';
import type { IDSLogger } from '../core/IDSLogger';
import { ConsoleLogger } from '../core/IDSLogger';

/**
 * Utility class for common HTTP operations
 */
export class HttpUtils {
  private logger: IDSLogger;

  constructor(logger?: IDSLogger) {
    this.logger = logger || new ConsoleLogger();
  }

  /**
   * Get client IP address from request
   */
  public getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string) ||
      (req.socket.remoteAddress as string) ||
      'unknown'
    );
  }

  /**
   * Validate required headers in the request
   */
  public validateRequestHeaders(
    req: Request,
    requiredHeaders: string[]
  ): { valid: boolean; missingHeaders: string[] } {
    const missingHeaders = requiredHeaders.filter(
      (header) => !req.headers[header.toLowerCase()]
    );
    
    return {
      valid: missingHeaders.length === 0,
      missingHeaders,
    };
  }

  /**
   * Async handler wrapper for Express routes with error handling
   */
  public asyncHandler<T = unknown>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await fn(req, res, next);
      } catch (error) {
        this.logger.error('Async handler error:', error);
        next(error);
      }
    };
  }

  /**
   * Set common security headers
   */
  public setSecurityHeaders(res: Response): void {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
    res.setHeader('Content-Security-Policy', "default-src 'self'");
  }

  /**
   * Generate a random request ID
   */
  public generateRequestId(): string {
    return 'req_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Parse pagination parameters from request query
   */
  public getPaginationParams(
    req: Request,
    defaultLimit = 10,
    maxLimit = 100
  ): { page: number; limit: number; offset: number } {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      maxLimit,
      Math.max(1, parseInt(req.query.limit as string) || defaultLimit)
    );
    const offset = (page - 1) * limit;

    return { page, limit, offset };
  }
}
