const { MongoClient } = require('mongodb');
const config = require('./config');

let client;
let db;

const connectDB = async () => {
  try {
    client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
  }
};

module.exports = { connectDB, getDB, closeDB };
