import './utils/elastic_apm';
import express, { Application } from 'express'; 
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swagger_option';
import router from './routes';
import { typeDefs } from './graphql/type_defs';
import { resolvers } from './graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { db, logger } from './utils/dependency_injection';
const ctx = 'init';

const startServer = async () => {
  try {
    const app: Application = express(); 
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    await router(app, server, logger, swaggerDocs);
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
    process.exit(1);
  });;