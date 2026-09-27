const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Automatically use an in-memory database for local dev to avoid needing local MongoDB installed
    if (mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
      console.log('Spinning up an in-memory MongoDB instance for development...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host} (In-Memory Database)`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
