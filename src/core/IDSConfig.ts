import dotenv from 'dotenv';
import path from 'path';
import type { IDSLogger } from './IDSLogger.js';
import { ConsoleLogger } from './IDSLogger.js';

/**
 * Configuration options for IDSConfig
 */
export interface IDSConfigOptions {
  /** Path to the .env file */
  envPath?: string;
  /** Whether to load environment variables from .env file */
  loadDotEnv?: boolean;
  /** Default values for configuration */
  defaults?: Record<string, string>;
}

/**
 * Configuration manager for the application
 */
export /**
 * Centralized configuration management for Idsentra applications
 */
class IDSConfig {
  private static instance: IDSConfig;
  private config: Record<string, string | number | boolean | undefined> = {};
  private logger: IDSLogger;

  private constructor(logger?: IDSLogger) {
    this.logger = logger || new ConsoleLogger({ component: 'IDSConfig' });
    this.loadEnvironment();
  }

  /**
   * Get the singleton instance of IDSConfig
   */
  public static getInstance(logger?: IDSLogger): IDSConfig {
    if (!IDSConfig.instance) {
      IDSConfig.instance = new IDSConfig(logger);
    }
    return IDSConfig.instance;
  }

  /**
   * Load environment variables from .env file and process.env
   */
  private loadEnvironment(): void {
    // Skip loading environment in test mode
    if (process.env.NODE_ENV === 'test') {
      this.config = {
        NODE_ENV: 'test',
        PORT: 3000,
        LOG_LEVEL: 'info',
        API_PREFIX: '/api',
        JWT_SECRET: 'test-secret-key',
        JWT_EXPIRES_IN: '1d',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_NAME: 'test_db',
        DB_USER: 'test_user',
        DB_PASSWORD: 'test_password',
        // Add any other required configs with test values
        ...process.env
      };
      return;
    }

    // Load .env file from project root
    const envPath = path.resolve(process.cwd(), '.env');
    dotenv.config({ path: envPath });

    // Load all environment variables into config
    this.config = {
      // Core settings
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: this.getNumber('PORT', 3000),
      
      // Logging
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      
      // API
      API_PREFIX: process.env.API_PREFIX || '/api',
      
      // Security
      JWT_SECRET: this.getRequired('JWT_SECRET'),
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
      
      // Database
      DB_HOST: process.env.DB_HOST || 'localhost',
      DB_PORT: this.getNumber('DB_PORT', 5432),
      DB_NAME: this.getRequired('DB_NAME'),
      DB_USER: this.getRequired('DB_USER'),
      DB_PASSWORD: this.getRequired('DB_PASSWORD'),
      
      // Add other environment variables as needed
      ...process.env,
    };

    this.logger.info('Environment configuration loaded', {
      environment: this.config.NODE_ENV,
      port: this.config.PORT,
    });
  }

  /**
   * Get a configuration value
   * @param key - Configuration key
   * @param defaultValue - Default value if key is not found
   */
  public get<T = string>(key: string, defaultValue?: T): T | undefined {
    const value = this.config[key] as T;
    return value !== undefined ? value : defaultValue;
  }

  /**
   * Get a required configuration value
   * @param key Configuration key
   * @param defaultValue Optional default value to use in test mode
   * @returns The configuration value
   * @throws Error if the key is not set and not in test mode
   */
  public getRequired<T = string>(key: string, defaultValue?: T): T {
    const value = this.get<T>(key);
    if (value === undefined) {
      if (process.env.NODE_ENV === 'test' && defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Required configuration key '${key}' is not set`);
    }
    return value;
  }

  /**
   * Get a configuration value as a number
   * @param key - Configuration key
   * @param defaultValue - Default value if key is not found or invalid
   */
  public getNumber(key: string, defaultValue: number): number {
    const value = this.get<string>(key);
    if (value === undefined) return defaultValue;
    
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }

  /**
   * Get a configuration value as a boolean
   * @param key - Configuration key
   * @param defaultValue - Default value if key is not found or invalid
   */
  public getBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.get<string>(key);
    if (value === undefined) return defaultValue;
    
    return value.toLowerCase() === 'true';
  }

  /**
   * Get all configuration values
   */
  public getAll(): Record<string, string | number | boolean | undefined> {
    return { ...this.config };
  }

  /**
   * Check if the application is running in production mode
   */
  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  /**
   * Check if the application is running in development mode
   */
  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  /**
   * Check if the application is running in test mode
   */
  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }
}

// Default config instance - lazy initialization
export const config = {
  getInstance: () => IDSConfig.getInstance(),
  get: <T = string>(key: string, defaultValue?: T): T | undefined => {
    return IDSConfig.getInstance().get<T>(key, defaultValue);
  },
  getRequired: <T = string>(key: string, defaultValue?: T): T => {
    return IDSConfig.getInstance().getRequired<T>(key, defaultValue);
  },
  getNumber: (key: string, defaultValue: number): number => {
    return IDSConfig.getInstance().getNumber(key, defaultValue);
  },
  getBoolean: (key: string, defaultValue: boolean): boolean => {
    return IDSConfig.getInstance().getBoolean(key, defaultValue);
  },
  getAll: () => {
    return IDSConfig.getInstance().getAll();
  },
  isProduction: () => {
    return IDSConfig.getInstance().isProduction();
  },
  isDevelopment: () => {
    return IDSConfig.getInstance().isDevelopment();
  },
  isTest: () => {
    return IDSConfig.getInstance().isTest();
  }
};
