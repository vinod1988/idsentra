# @idsentra/core

Core utilities for Idsentra microservices platform - A collection of shared utilities for building consistent, reliable, and maintainable microservices in Node.js/TypeScript.

### IDSentra Core Utilities

IDS + Centra (centralized) → core API utilities

## 📦 Features

- **Standardized API Responses**: Consistent response structure across all microservices
- **TypeScript First**: Full TypeScript support with strict type checking
- **Modular Design**: Import only what you need to keep your bundle size small
- **Production Ready**: Built with performance and reliability in mind
- **Comprehensive Error Handling**: Structured error responses and logging
- **Configurable**: Flexible configuration system with environment variable support

## 🚀 Installation

```bash
# Using npm
npm install @idsentra/core

# Using yarn
yarn add @idsentra/core

# Using pnpm
pnpm add @idsentra/core
```

## 🔧 Prerequisites

- Node.js 16.x or later
- TypeScript 4.5.0 or later (for TypeScript projects)

## 📚 Documentation

### Core Modules

#### 1. API Response Builder

Standardized response formatting for all API endpoints.

```typescript
import { ApiResponseBuilder } from '@idsentra/core';

// Success response
const successResponse = ApiResponseBuilder.success('Operation successful', { id: 123 });

// Error response
const errorResponse = ApiResponseBuilder.error('Operation failed', new Error('Something went wrong'));
```

#### 2. HTTP Client

Configurable HTTP client with retry mechanism and request/response interceptors.

```typescript
import { IDSApiClient } from '@idsentra/core';

const apiClient = new IDSApiClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  logger: new ConsoleLogger()
});

// Make requests
const response = await apiClient.get('/users/123');
```

#### 3. Configuration Management

Centralized configuration with environment variable support.

```typescript
import { IDSConfig } from '@idsentra/core';

// Initialize with defaults
const config = new IDSConfig({
  defaults: {
    PORT: 3000,
    NODE_ENV: 'development',
    LOG_LEVEL: 'info'
  }
});

// Access configuration
const port = config.getNumber('PORT');
```

#### 4. Logging

Structured logging with support for different log levels and context.

```typescript
import { ConsoleLogger } from '@idsentra/core';

const logger = new ConsoleLogger({ service: 'auth-service' });

logger.info('User logged in', { userId: 123 });
logger.error('Login failed', new Error('Invalid credentials'));
```

### Utility Modules

- **HttpUtils**: Common HTTP-related utilities
- **HeaderUtils**: HTTP header manipulation
- **RetryPolicy**: Configurable retry logic for operations

## 🚀 Quick Start

### Basic Usage Example

```typescript
import { ConsoleLogger, IDSConfig, IDSApiClient, ApiResponseBuilder } from '@idsentra/core';

// 1. Setup logger
const logger = new ConsoleLogger({ component: 'example-app' });

// 2. Initialize configuration
const config = IDSConfig.getInstance(logger);
config.set('API_URL', 'https://api.example.com');

// 3. Create API client
const apiClient = new IDSApiClient({
  baseURL: config.get('API_URL'),
  logger
});

// 4. Make API requests
async function fetchData() {
  try {
    const response = await apiClient.get('/data');
    logger.info('Data received:', response.data);
    return ApiResponseBuilder.success('Data fetched', response.data);
  } catch (error) {
    logger.error('Failed to fetch data:', error);
    return ApiResponseBuilder.error('Failed to fetch data', error);
  }
}
```

## 📚 Examples

The `/examples` directory contains comprehensive examples demonstrating how to use the `@idsentra/core` package:

1. **Basic Usage** (`basic-usage.ts`):
   - Logger setup and usage
   - Configuration management
   - API client with retry logic
   - Standardized API responses
   - Error handling patterns

To run the examples:

```bash
# Navigate to the package root
cd /path/to/idsentra

# Install dependencies
npm install

# Build the package
npm run build

# Run the examples
npx ts-node examples/basic-usage.ts
```

For more detailed examples, see the [examples/README.md](examples/README.md) file.

## 🛠️ Development

### Project Structure

```
src/
  core/           # Core functionality
  utils/         # Utility functions
  types/         # TypeScript type definitions
tests/           # Test files
```

### Building the Project

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Run type checker
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.

## 👥 Contributors

- [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Ivan Digital Solutions](https://ivandigitalsolutions.com) for the initial development

// Success response
const successResponse = ApiResponseBuilder.success('Operation successful', { id: 1, name: 'Example' });

// Error response
try {
  // Some operation that might fail
  throw new Error('Something went wrong');
} catch (error) {
  const errorResponse = ApiResponseBuilder.error('Failed to process request', error);
}
```

### Response Format

#### Success Response
```typescript
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Your data here
  }
}
```

#### Error Response
```typescript
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    "code": "ERROR_CODE",
    "details": "Error details",
    "stack": "Error stack trace (in development only)"
  }
}
```

## API Reference

### `ApiResponseBuilder`

#### `ApiResponseBuilder.success<T>(message: string, data: T): StandardApiResponse<T>`
Creates a successful API response.

#### `ApiResponseBuilder.error<T = {}>(message: string, error?: any, data?: T): StandardApiResponse<T>`
Creates an error API response.

### `StandardApiResponse<T>`
```typescript
interface StandardApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code?: string;
    details?: string;
    stack?: string;
  };
}
```

## License

ISC © [Ivan Digital Solutions](https://www.ivandigitalsolutions.com)
