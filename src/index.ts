import express from 'express';
import logger from './utils/logger';
import {createUser, getUser} from './handler/user_handler';


const app = express();
const port = 3000;

app.use(express.json());

app.post('/users', createUser);
app.get('/users', getUser);

app.listen(port, () => {
  logger.info(`Server berjalan di http://localhost:${port}`);
});
