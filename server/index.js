const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
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
    
    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: config.PORT },
      context: async ({ req }) => {
        return {};
      }
    });
    
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
