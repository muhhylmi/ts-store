import { NextFunction, Request, Response } from 'express';
import { HttpException } from './exception';
import logger from './logger';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  logger.error(message);
  res.status(status).json({
    status,
    message,
  });
  next();
};

export default errorHandler;
