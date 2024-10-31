import express from 'express';
import errorHandler  from './utils/errors';
import config from './infrastructure/config';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swagger_option';
import router from './routes';
import { Logging } from './utils/logger';

const logger = new Logging();
const app = express();
app.use(express.json());
const swaggerDocs = swaggerJsdoc(swaggerOptions);

router(app);
app.use("*", errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(config.PORT, () => {
  logger.logInfo(`Server berjalan di http://localhost:${config.PORT}`);
});
