# Changelog

All notable changes to the `idsentra` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2025-09-19

### Fixed
- Fixed ES module import issues that caused "idsentra not available" errors
- Corrected package.json main entry point from `dist/index.js` to `dist/src/index.js`
- Added proper ES module exports configuration
- Fixed all internal import paths to include `.js` extensions for ES modules
- Made IDSConfig singleton initialization lazy to prevent import-time errors
- Ensured compatibility with both CommonJS and ES module environments

## [1.1.0] - 2025-09-19

### Added
- Initial project structure with core utilities
- Standardized API response builder
- HTTP client with retry mechanism
- Configuration management
- Logging utilities
- HTTP and header utilities
- Comprehensive TypeScript type definitions
- Unit test setup
- Optional peer dependency metadata for Express

### Changed
- Restructured project to follow monorepo patterns
- Updated all dependencies to latest stable versions
- Improved error handling and type safety
- Standardized API response format across all utilities
- Updated Express peer dependency to support latest version (>=5.1.0) with backward compatibility (>=4.18.0)
- Updated @types/express to v5.0.3 for better TypeScript support

### Fixed
- Resolved TypeScript type issues
- Fixed error handling in retry mechanism
- Addressed all linting warnings and errors
- Ensured consistent code style throughout the project
- Fixed peer dependency conflicts that required --legacy-peer-deps flag
- Made Express peer dependency optional to improve installation experience

## [0.2.0] - 2025-07-19

### Added
- Initial public release
- Core utilities for microservices
- Comprehensive documentation
- Example usage in README

### Changed
- Renamed package to `idsentra` (unscoped)
- Updated project structure for better maintainability
- Improved documentation and code comments

## [0.1.0] - 2025-07-15

### Added
- Initial project setup
- Basic utility functions
- TypeScript configuration
- Build and test scripts
