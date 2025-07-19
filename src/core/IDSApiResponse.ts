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
   * @param error - Error details
   * @param data - Additional error data
   * @returns Standardized error response
   */
  static error<T = unknown>(
    message: string,
    error?: Error | string | Record<string, unknown>,
    data: T = {} as T
  ): StandardApiResponse<T> {
    const response: StandardApiResponse<T> = {
      success: false,
      message,
      data,
    };

    if (!error) {
      return response;
    }

    // Handle different error types
    response.error = {};

    if (typeof error === 'string') {
      response.error.details = error;
    } else if (error instanceof Error) {
      response.error.details = error.message;
      response.error.stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;
      
      // Handle custom error properties
      if ('code' in error && typeof (error as { code?: unknown }).code === 'string') {
        response.error.code = (error as { code: string }).code;
      }
    } else if (typeof error === 'object' && error !== null) {
      // Handle plain objects
      if ('message' in error && typeof error.message === 'string') {
        response.error.details = error.message;
      } else if ('details' in error && typeof error.details === 'string') {
        response.error.details = error.details;
      }
      
      if ('code' in error && typeof error.code === 'string') {
        response.error.code = error.code;
      }
      
      if ('stack' in error && typeof error.stack === 'string' && process.env.NODE_ENV === 'development') {
        response.error.stack = error.stack;
      }
    }

    return response;
  }
}
