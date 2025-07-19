// Core exports
export { ApiResponseBuilder } from './core/IDSApiResponse';
export type { StandardApiResponse } from './core/IDSApiResponse';

export { IDSApiClient } from './core/IDSApiClient';
export type { IDSApiClientConfig } from './core/IDSApiClient';

export { ConsoleLogger, EmojiLogger } from './core/IDSLogger';
export type { IDSLogger } from './core/IDSLogger';

export { IDSConfig, config } from './core/IDSConfig';
export type { IDSConfigOptions } from './core/IDSConfig';

// Utils exports
export { HttpUtils } from './utils/HttpUtils';
export { RetryPolicy, type RetryPolicyOptions } from './utils/RetryPolicy';
export { HeaderUtils } from './utils/HeaderUtils';

// Re-export common types for convenience
export type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
export type { Request, Response, NextFunction } from 'express';
