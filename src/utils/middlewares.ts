import { NextFunction, Request, Response } from "express";
import config from "../infrastructure/config";
import { HttpException } from "./exception";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../domain/model/jwt_payload";
import IUserRepo from "../domain/repositories/user_repo_int";
import { AnyZodObject, ZodError } from 'zod';
import { responseError } from "./wrapper";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] || '';

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username !== config.BASIC_AUTH_USERNAME) {
        throw new HttpException(404, "Credentials is invalid");
    }
    if (password !== config.BASIC_AUTH_PASSWORD) {
        throw new HttpException(404, "Credentials is invalid");
    }
    next();
};

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction, repo: IUserRepo) => {
    try {
        const authHeader = req.headers['authorization'] || '';

        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, config.JWTPRIVATEKEY) as JwtPayload;
        if (!decode) {
            throw next(new HttpException(400, "Invalid Token"));
        }

        const user = repo.findOne({
            username: decode.username
        });
        if (!user) {
            throw new HttpException(400, "Invalid Token");
        }

        req.body.users = user;

        next();
    } catch (error) {
        next(error);
    }
};


export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next(); 
  } catch (error) {
    if (error instanceof ZodError) {
      return responseError(res, 400, error.errors.map(e => e.path + e.message));
    }
    next(error);
  }
};

export const validateParams = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        return responseError(res, 400, error.errors.map(e => e.path + e.message));
      }
      next(error);
    }
};

export const validateQueries = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        return responseError(res, 400, error.errors.map(e => e.path + e.message));
      }
      next(error);
    }
};
