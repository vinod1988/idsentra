<meta name="description" content="Idsentra - A comprehensive Node.js/TypeScript utility library for building scalable microservices with logging, configuration, and API client tools. Perfect for enterprise-grade applications.">
<meta name="keywords" content="idsentra, nodejs, typescript, microservices, logger, configuration, api client, utilities, backend development, node.js framework, typescript library, enterprise software, devops, cloud native">

# 🚀 Idsentra

[![npm version](https://img.shields.io/npm/v/idsentra.svg?style=flat-square)](https://www.npmjs.com/package/idsentra)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

**Idsentra** is a powerful, production-ready utility library for Node.js and TypeScript developers building microservices and enterprise applications. It provides essential tools for logging, configuration management, and API communication, following modern development best practices.

## 🌟 Key Features

- **Unified Logging System** - Structured, level-based logging with emoji support and context tracking
- **Configuration Management** - Environment-aware configuration with type safety and validation
- **API Client** - Robust HTTP client with retry mechanisms and interceptors
- **Response Formatting** - Consistent API response structures for better API design
- **Developer Experience** - TypeScript-first approach with excellent IDE support
- **Production Ready** - Battle-tested in high-load environments

## 📊 Why Choose Idsentra?

- **Performance Optimized** - Built with performance in mind for high-throughput applications
- **Modular Design** - Use only what you need, keep your bundle size minimal
- **Type Safe** - Full TypeScript support with comprehensive type definitions
- **Extensible** - Easy to extend and customize for your specific needs
- **Well Documented** - Comprehensive documentation and examples to get you started quickly
- **Active Maintenance** - Regularly updated with new features and security patches

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
npm install idsentra

# Using yarn
yarn add idsentra

# Using pnpm
pnpm add idsentra
```

## 🔧 Prerequisites

- Node.js 16.x or later
- TypeScript 4.5.0 or later (for TypeScript projects)

## 📚 Documentation

### Core Modules

#### 1. API Response Builder

Standardized response formatting for all API endpoints.

```typescript
import { ApiResponseBuilder } from 'idsentra';

// Success response
const successResponse = ApiResponseBuilder.success('Operation successful', { id: 123 });

// Error response
const errorResponse = ApiResponseBuilder.error('Operation failed', new Error('Something went wrong'));
```

#### 2. HTTP Client

Configurable HTTP client with retry mechanism and request/response interceptors.

```typescript
import { IDSApiClient } from 'idsentra';

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
import { IDSConfig } from 'idsentra';

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
import { ConsoleLogger } from 'idsentra';

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
import { ConsoleLogger, IDSConfig, IDSApiClient, ApiResponseBuilder } from 'idsentra';

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

The `/examples` directory contains comprehensive examples demonstrating how to use the `idsentra` package:

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
