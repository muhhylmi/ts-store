import express, { Application } from "express";
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import userRouter from "./user_routes";
import roleRouter from "./role_routes";
import itemRouter from "./item_routes";
import cartRouter from "./cart_routes";
import midtransRouter from "./midtrans";
import { expressMiddleware } from '@apollo/server/express4'; 
import { ApolloServer } from "@apollo/server";
import handlerError from "../utils/errors";
import config from "../infrastructure/config";
import { Logging } from "../utils/logger";

const router = async (app: Application, server: ApolloServer, logger: Logging, doc: SwaggerOptions) => {
  app.use(express.json());
  app.use('/api/users', userRouter);
  app.use('/api/roles', roleRouter);
  app.use('/api/items', itemRouter);
  app.use('/api/carts', cartRouter);
  app.use('/api/midtrans', midtransRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));

  // graphql
  app.use('/graphql', expressMiddleware(server));
  
  // error handler
  app.use('*', handlerError.notFoundPath);
  app.use(handlerError.errorHandler);

  // listener
  app.listen(config.PORT, () => {
    logger.logInfo(`Server running at http://localhost:${config.PORT}`);
  });
};

export default router;