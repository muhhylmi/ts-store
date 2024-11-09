import './utils/elastic_apm';
import config from './infrastructure/config';
import express, { Application } from 'express'; 
import handlerError from './utils/errors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swagger_option';
import router from './routes';
import { typeDefs } from './graphql/type_defs';
import { resolvers } from './graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
import { basicAuthMiddlewareDI, db, logger } from './utils/dependency_injection';
const ctx = 'init';

// Start the Apollo Server
const startServer = async () => {
  try {
    const app: Application = express(); 

    // Middleware for parsing JSON requests
    app.use(express.json());

    // Initialize Swagger documentation
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    router(app);
    app.use('/graphql/user', basicAuthMiddlewareDI);
    app.use('/graphql', expressMiddleware(server));
    app.use('*', handlerError.notFoundPath);
    app.use(handlerError.errorHandler);

    // Start the server
    app.listen(config.PORT, () => {
      logger.logInfo(`Server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.logError(ctx, `Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer()
  .catch(async (e) => {
    logger.logError(ctx, e);
    await db.getPrismaService().disconnect();
    await db.getRedisService().disconnect();
  });;