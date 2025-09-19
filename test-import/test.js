const { IDSApiClient, ConsoleLogger } = require('idsentra');

console.log('✅ Successfully imported IDSApiClient:', typeof IDSApiClient);
console.log('✅ Successfully imported ConsoleLogger:', typeof ConsoleLogger);
// console.log('✅ Successfully imported IDSConfig:', typeof IDSConfig);

// Test creating instances
try {
  const logger = new ConsoleLogger();
  console.log('✅ Successfully created ConsoleLogger instance');
  
  // Test IDSApiClient creation (requires logger)
  const apiClient = new IDSApiClient({
    baseURL: 'https://api.example.com',
    logger: logger
  });
  console.log('✅ Successfully created IDSApiClient instance');
  
  console.log('🎉 All imports working correctly!');
} catch (error) {
  console.error('❌ Error:', error.message);
}
