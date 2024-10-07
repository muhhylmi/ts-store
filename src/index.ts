import express from 'express';
import logger from './utils/logger';
import {createUser, getUser} from './handler/user_handler';
import errorHandler  from './utils/errors';
import config from './infra/env';

const app = express();

app.use(express.json());

app.post('/users', createUser);
app.get('/users', getUser);

app.use("*", errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server berjalan di http://localhost:${config.PORT}`);
});
