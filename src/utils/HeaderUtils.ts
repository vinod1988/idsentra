import type { Request, Response } from 'express';

/**
 * Utility class for handling HTTP headers
 */
export class HeaderUtils {
  /**
   * Set standard security headers
   */
  public static setSecurityHeaders(res: Response): void {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Enforce HTTPS
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Content Security Policy
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';"
    );
    
    // Prevent content type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Download-Options', 'noopen');
  }

  /**
   * Get request ID from headers or generate a new one
   */
  public static getRequestId(req: Request): string {
    return (
      (req.headers['x-request-id'] as string) ||
      (req.headers['x-correlation-id'] as string) ||
      `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    );
  }

  /**
   * Set response headers for JSON responses
   */
  public static setJsonResponseHeaders(res: Response): void {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  /**
   * Set CORS headers
   */
  public static setCorsHeaders(
    res: Response,
    options: {
      origin?: string;
      methods?: string;
      allowedHeaders?: string;
      exposedHeaders?: string;
      credentials?: boolean;
    } = {}
  ): void {
    res.setHeader(
      'Access-Control-Allow-Origin',
      options.origin || '*'
    );
    
    res.setHeader(
      'Access-Control-Allow-Methods',
      options.methods || 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    
    res.setHeader(
      'Access-Control-Allow-Headers',
      options.allowedHeaders || 'Content-Type, Authorization, X-Requested-With'
    );
    
    if (options.exposedHeaders) {
      res.setHeader('Access-Control-Expose-Headers', options.exposedHeaders);
    }
    
    if (options.credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }

  /**
   * Set rate limit headers
   */
  public static setRateLimitHeaders(
    res: Response,
    options: {
      limit: number;
      remaining: number;
      reset: number;
    }
  ): void {
    res.setHeader('X-RateLimit-Limit', options.limit.toString());
    res.setHeader('X-RateLimit-Remaining', options.remaining.toString());
    res.setHeader('X-RateLimit-Reset', options.reset.toString());
  }
}
