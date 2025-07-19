/**
 * Standard API response interface
 * @template T - Type of the data property
 */
export interface StandardApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code?: string;
    details?: string;
    stack?: string;
  };
}

/**
 * Builder for creating standardized API responses
 */
export class ApiResponseBuilder {
  /**
   * Create a successful API response
   * @param message - Success message
   * @param data - Response data (can be empty object but not null/undefined)
   * @returns Standardized success response
   */
  static success<T>(message: string, data: T): StandardApiResponse<T> {
    return {
      success: true,
      message,
      data: data || ({} as T),
    };
  }

  /**
   * Create an error API response
   * @param message - Error message
   * @param error - Error object or string
   * @param data - Optional additional data
   * @returns Standardized error response
   */
  static error<T = Record<string, never>>(
    message: string, 
    error?: unknown, 
    data?: T
  ): StandardApiResponse<T> {
    const response: StandardApiResponse<T> = {
      success: false,
      message,
      data: data || ({} as T),
    };
    
    if (error) {
      const errorObj = error as Error & { code?: string; details?: string };
      response.error = {
        code: errorObj.code || 'INTERNAL_ERROR',
        details: errorObj.message || String(error),
        // Only include stack trace in development
        stack: process.env.NODE_ENV === 'development' && errorObj.stack ? errorObj.stack : undefined,
      };
    }
    
    return response;
  }
}
