/**
 * idsentra Usage Examples
 * 
 * This file demonstrates how to use the main components of the idsentra package.
 * It shows how to use the logger, configuration, API client, and other utilities.
 */

// Import from the main index file which handles all exports
import { 
  EmojiLogger, 
  IDSConfig, 
  IDSApiClient, 
  IDSLogger,
  ApiResponseBuilder 
} from '../src/index.js';

/**
 * Example 1: Logger with Emoji Support
 * 
 * Demonstrates how to use the EmojiLogger for logging with emoji prefixes.
 */
function setupLogger(): IDSLogger {
  // Default logger with context
  console.log('=== 1.1 Default Emoji Logger ===');
  const defaultLogger = new EmojiLogger({ component: 'Example', env: 'test' });
  
  // Log messages at different levels
  defaultLogger.info('Application starting up');
  defaultLogger.warn('This is a warning message');
  defaultLogger.error('An error occurred', new Error('Something went wrong'));
  defaultLogger.success('Operation completed successfully!');
  defaultLogger.info('Processing request', { requestId: 'req_8kjq7eur' });
  
  // Custom logger with different emojis and options
  console.log('\n=== 1.2 Custom Emoji Logger ===');
  const customLogger = new EmojiLogger(
    { component: 'CustomLogger', env: 'test' },
    {
      // Custom emojis
      emojis: {
        INFO: '✨',
        WARN: '🚧',
        ERROR: '🔥',
        DEBUG: '🔍',
        SUCCESS: '🎉',
        CUSTOM: '⚡',
      },
      // Hide timestamp for cleaner output
      showTimestamp: false,
      // Hide log level since it's somewhat redundant with emojis
      showLevel: false,
    }
  );
  
  // Log with custom emojis
  customLogger.info('This uses a sparkle emoji');
  customLogger.warn('This uses a construction emoji');
  customLogger.error('This uses a fire emoji', { code: 500 });
  customLogger.success('This uses a party popper emoji');
  
  // Add a custom log level and log with it
  customLogger.setEmoji('CUSTOM', '⚡');
  customLogger.logCustom('CUSTOM', 'This is a custom log level with lightning emoji');
  
  // Child logger that inherits context and settings
  console.log('\n=== 1.3 Child Logger ===');
  const childLogger = customLogger.child({ requestId: 'req_xyz123' });
  childLogger.info('Child logger inherits context and settings');
  
  return defaultLogger;
}

/**
 * Example 2: Configuration Management
 * 
 * Demonstrates how to use IDSConfig to manage configuration.
 */
function setupConfiguration(logger: IDSLogger): void {
  // Initialize configuration
  const config = IDSConfig.getInstance(logger);
  
  // Set test environment to use mock configuration
  process.env.NODE_ENV = 'test';
  
  // Get configuration values with defaults
  const apiUrl = config.get('API_URL', 'https://api.fallback.com');
  const maxRetries = config.getNumber('MAX_RETRIES', 5);
  
  logger.info(`API URL: ${apiUrl}`);
  logger.info(`Max retries: ${maxRetries}`);
  
  // Show environment-specific behavior
  if (config.isDevelopment()) {
    logger.info('Running in development mode - debug features enabled');
  }
  
  // Check environment
  if (config.isDevelopment()) {
    logger.debug('Running in development mode');
  }
  
  // Show how to use required configuration
  try {
    const requiredValue = config.getRequired('REQUIRED_CONFIG');
    logger.info(`Required config value: ${requiredValue}`);
  } catch (error) {
    logger.warn('Optional: Set REQUIRED_CONFIG in your .env file');
  }
}

// Example 3: API Client Usage
async function fetchData(logger: IDSLogger): Promise<void> {
  try {
    // Create an API client
    const apiClient = new IDSApiClient({
      baseURL: 'https://jsonplaceholder.typicode.com',
      logger,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    // Make a GET request
    const response = await apiClient.get('/todos/1');
    logger.info('Received data:', response.data);
    
    // Make a POST request with data
    const postResponse = await apiClient.post('/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    
    logger.info('Created post:', postResponse.data);
  } catch (error) {
    logger.error('API request failed:', error);
  }
}

// Example 4: API Response Builder
function handleApiResponse() {
  // Success response
  const successResponse = ApiResponseBuilder.success(
    'Data retrieved successfully',
    { id: 1, name: 'Example' }
  );
  
  console.log('Success Response:', JSON.stringify(successResponse, null, 2));
  
  // Error response
  const error = new Error('Failed to fetch data');
  const errorResponse = ApiResponseBuilder.error(
    'Failed to process request',
    error,
    { requestId: 'req_123' }
  );
  
  console.log('Error Response:', JSON.stringify(errorResponse, null, 2));
}

// Example 5: Using Retry Policy
async function demonstrateRetryPolicy(logger: IDSLogger) {
  const { RetryPolicy } = await import('../src/utils/RetryPolicy');
  
  const retryPolicy = new RetryPolicy({
    maxRetries: 3,
    initialDelay: 1000, // 1 second
    backoffFactor: 2,
    logger
  });
  
  try {
    const result = await retryPolicy.execute(async () => {
      // Simulate an API call that might fail
      const shouldFail = Math.random() > 0.5;
      if (shouldFail) {
        throw new Error('Temporary failure');
      }
      return { data: 'Success!' };
    });
    
    logger.info('Operation succeeded:', result);
  } catch (error) {
    logger.error('All retry attempts failed:', error);
  }
}

// Main function to run all examples
async function main() {
  console.log('=== idsentra Usage Examples ===\n');
  
  // Example 1: Logger
  console.log('=== 1. Logger Example ===');
  const logger = setupLogger();
  
  // Example 2: Configuration
  console.log('\n=== 2. Configuration Example ===');
  setupConfiguration(logger);
  
  // Example 3: API Client
  console.log('\n=== 3. API Client Example ===');
  await fetchData(logger);
  
  // Example 4: API Response Builder
  console.log('\n=== 4. API Response Builder Example ===');
  handleApiResponse();
  
  // Example 5: Retry Policy
  console.log('\n=== 5. Retry Policy Example ===');
  await demonstrateRetryPolicy(logger);
  
  console.log('\n=== Examples completed ===');
}

// Run the examples
main().catch(console.error);
