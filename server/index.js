const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { connectDB } = require('./database');
const seedData = require('./seed');
const config = require('./config');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed initial data
    await seedData();
    
    // Create Express app
    const app = express();
    
    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path
        };
      }
    });
    
    // Start Apollo Server
    await server.start();
    
    // Apply middleware
    app.use('/graphql', cors({
      origin: process.env.NODE_ENV === 'production' 
        ? true  // Allow all origins in production
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3004'],
      credentials: true
    }), express.json(), expressMiddleware(server));
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    
    // Start the server
    const port = process.env.PORT || config.PORT;
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
