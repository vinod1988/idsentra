import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import type { IDSLogger } from './IDSLogger.js';
import type { StandardApiResponse } from './IDSApiResponse.js';

/**
 * Configuration for the API client
 */
export interface IDSApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  logger?: IDSLogger;
}

/**
 * Standardized API client with built-in error handling and logging
 */
export class IDSApiClient {
  private client: AxiosInstance;
  private logger: IDSLogger;
  private readonly defaultTimeout = 30000; // 30 seconds
  private defaultHeaders: Record<string, string> = {};

  constructor(config: IDSApiClientConfig) {
    if (!config.logger) {
      throw new Error('Logger is required for IDSApiClient');
    }
    this.logger = config.logger;
    
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || this.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        this.logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          method: config.method,
          url: config.url,
          headers: config.headers,
        });
        return config;
      },
      (error) => {
        this.logger.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        this.logger.debug(`API Response: ${response.status} ${response.config.url}`, {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        });
        return response;
      },
      (error) => {
        const errorMessage = error.response
          ? `API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response.status} ${error.response.statusText}`
          : `API Request Failed: ${error.message}`;

        this.logger.error(errorMessage, {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
        });

        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<StandardApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config);
      return {
        success: true,
        message: 'Request successful',
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Make a POST request
   */
  public async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<StandardApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return {
        success: true,
        message: 'Resource created successfully',
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Make a PUT request
   */
  public async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<StandardApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return {
        success: true,
        message: 'Resource updated successfully',
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Make a DELETE request
   */
  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<StandardApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config);
      return {
        success: true,
        message: 'Resource deleted successfully',
        data: response.data,
      };
    } catch (error: unknown) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleError<T>(error: unknown): StandardApiResponse<T> {
    const axiosError = error as AxiosError<{ message?: string }>;
    
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const responseData = axiosError.response.data;
      return {
        success: false,
        message: responseData?.message || 'API request failed',
        data: responseData as T,
        error: {
          code: axiosError.response.status.toString(),
          details: responseData?.message || axiosError.message,
          ...(this.isDevelopment() && { stack: axiosError.stack }),
        },
      };
    } 
    
    if (axiosError.request) {
      // The request was made but no response was received
      return {
        success: false,
        message: 'No response received from server',
        data: {} as T,
        error: {
          code: 'NO_RESPONSE',
          details: 'The request was made but no response was received',
          ...(this.isDevelopment() && { stack: axiosError.stack }),
        },
      };
    }
    
    // Something happened in setting up the request that triggered an Error
    return {
      success: false,
      message: 'Error setting up request',
      data: {} as T,
      error: {
        code: 'REQUEST_ERROR',
        details: axiosError.message,
        ...(this.isDevelopment() && { stack: axiosError.stack }),
      },
    };
  }

  /**
   * Check if the application is running in development mode
   * @private
   */
  private isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
  }
}
