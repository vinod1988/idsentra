// Core exports
export { ApiResponseBuilder } from './core/IDSApiResponse.js';
export type { StandardApiResponse } from './core/IDSApiResponse.js';

export { IDSApiClient } from './core/IDSApiClient.js';
export type { IDSApiClientConfig } from './core/IDSApiClient.js';

export { ConsoleLogger, EmojiLogger } from './core/IDSLogger.js';
export type { IDSLogger } from './core/IDSLogger.js';

export { IDSConfig, config } from './core/IDSConfig.js';
export type { IDSConfigOptions } from './core/IDSConfig.js';

// Utils exports
export { HttpUtils } from './utils/HttpUtils.js';
export { RetryPolicy, type RetryPolicyOptions } from './utils/RetryPolicy.js';
export { HeaderUtils } from './utils/HeaderUtils.js';

// Re-export common types for convenience
export type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
export type { Request, Response, NextFunction } from 'express';
