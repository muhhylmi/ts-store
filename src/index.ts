import express from 'express';
import logger from './utils/logger';
import errorHandler  from './utils/errors';
import config from './infra/env';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';
import userRouter from './routes/user_routes';

const app = express();
app.use(express.json());
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api/users', userRouter);
app.use("*", errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(config.PORT, () => {
  logger.info(`Server berjalan di http://localhost:${config.PORT}`);
});
