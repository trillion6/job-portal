const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = null;

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;
  const useMemoryDB = process.env.USE_MEMORY_DB === 'true';

  // If in-memory is explicitly requested, or no URI, or local address provided
  if (useMemoryDB || !mongoUri || mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
    console.log('Spinning up an in-memory MongoDB instance for local development...');
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host} (In-Memory Database)`);
    return conn;
  }

  // Attempt connecting to the configured MongoDB URI (e.g. MongoDB Atlas)
  try {
    console.log('Attempting connection to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5s timeout to avoid hanging if IP is not whitelisted
    });
    console.log(`MongoDB Connected: ${conn.connection.host} (MongoDB Atlas Cloud Database)`);
    return conn;
  } catch (error) {
    console.warn(`\n⚠️  Could not connect to MongoDB Atlas cluster: ${error.message}`);
    console.warn('💡 Reason: Atlas cluster IP access list is likely blocking your current IP address.');
    console.warn('👉 To connect to Atlas: Add your current IP or 0.0.0.0/0 to Network Access in MongoDB Atlas.');
    console.log('🔄 Seamlessly falling back to In-Memory MongoDB so Nexora runs without interruption...\n');

    try {
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected: ${conn.connection.host} (In-Memory Fallback Database)`);
      return conn;
    } catch (fallbackError) {
      console.error(`Fatal: Failed to start in-memory database: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
