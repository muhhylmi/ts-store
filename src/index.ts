import express, { Application } from 'express'; 
import errorHandler from './utils/errors';
import config from './infrastructure/config';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swagger_option';
import router from './routes';
import { typeDefs } from './graphql/type_defs';
import { resolvers } from './graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
import { basicAuthMiddlewareDI, db, logger } from './utils/dependency_injection';

const app: Application = express(); 

// Middleware for parsing JSON requests
app.use(express.json());

// Initialize Swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router(app);
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
const startServer = async () => {
  try {
    await server.start();

    app.use('/graphql/user', basicAuthMiddlewareDI);
    app.use('/graphql', expressMiddleware(server));
    app.use('*', errorHandler);

    // Start the server
    app.listen(config.PORT, () => {
      logger.logInfo(`Server running at http://localhost:${config.PORT}/graphql`);
    });
  } catch (error) {
    logger.logError(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer()
  .catch(async (e) => {
    logger.logError(e);
    await db.disconnect();
  });;