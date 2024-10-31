import { NextFunction, Request, Response } from 'express';
import { HttpException } from './exception';
import { responseError } from './wrapper';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  responseError(res, status, message);
  next();
};

export default errorHandler;
