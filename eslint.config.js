import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  // Base configuration
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Project-specific settings
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  
  // TypeScript specific rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      
      // General rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'semi': ['error', 'always']
    },
  }
];
