// Test the exact same import pattern that was failing in PM2
const { IDSApiClient, ConsoleLogger } = require('idsentra');

console.log('✅ Successfully loaded idsentra module from npm');
console.log('✅ IDSApiClient:', typeof IDSApiClient);
console.log('✅ ConsoleLogger:', typeof ConsoleLogger);

// Test creating instances
try {
  const logger = new ConsoleLogger();
  console.log('✅ Created ConsoleLogger instance');
  
  const apiClient = new IDSApiClient({
    baseURL: 'https://api.example.com',
    logger: logger
  });
  console.log('✅ Created IDSApiClient instance');
  
  console.log('🎉 PM2 fix verified - idsentra module loads correctly!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
