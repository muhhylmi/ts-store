import { NextFunction, Request, Response } from "express";
import config from "../infrastructure/config";
import { HttpException } from "./exception";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../domain/model/jwt_payload";
import IUserRepo from "../domain/repositories/user_repo_int";
import { AnyZodObject, ZodError } from 'zod';
import { responseError } from "./wrapper";

export const basicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw next(new HttpException(400, "Invalid Token"));
    }

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
  } catch (error) {
    next(error);
  }
};

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction, repo: IUserRepo) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw next(new HttpException(400, "Invalid Token"));
    }

    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, config.JWTPRIVATEKEY) as JwtPayload;
    if (!decode) {
      throw next(new HttpException(400, "Invalid Token"));
    }

    const user = await repo.findOne({
      username: decode.username
    });
    if (!user) {
      throw new HttpException(400, "Invalid Token");
    }

    req.body.user = user;

    next();
  } catch (error) {
    next(error);
  }
};


export const newJwtAuthMiddleware = (repo: IUserRepo) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        throw next(new HttpException(400, "Invalid Token"));
      }
  
      const token = authHeader.split(' ')[1];
      const decode = jwt.verify(token, config.JWTPRIVATEKEY) as JwtPayload;
      if (!decode) {
        throw next(new HttpException(400, "Invalid Token"));
      }
  
      const user = await repo.findOne({
        username: decode.username
      });
      if (!user) {
        throw new HttpException(400, "Invalid Token");
      }
  
      req.body.user = user;
  
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next(); 
  } catch (error) {
    if (error instanceof ZodError) {
      return responseError(res, 400, error.errors.map(e => e.path + " " + e.message));
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
      return responseError(res, 400, error.errors.map(e => e.path + " " + e.message));
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
      return responseError(res, 400, error.errors.map(e => e.path + " " + e.message));
    }
    next(error);
  }
};


export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req);

    if (!result.success) {
      // Kirim response error jika validasi gagal
      const errors = result.error.format();
      return res.status(400).json({ message: errors, data: null });
    }

    // Assign nilai yang sudah divalidasi kembali ke req
    req.params = result.data.params;
    req.body = {
      user: req.body.user,
      ...result.data.body
    };
    
    next();
  };
};

export const validateHandlers = <T>(
  schema: AnyZodObject,
  data: unknown
): { success: boolean; data?: T; errors?: string } => {
  try {
    const parsedData = schema.parse(data); 
    return { success: true, data: parsedData as T }; 
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map(issue => {
        return `${issue.path.join('.')} - ${issue.message}`;
      }).join(', ');

      return { success: false, errors: errorMessages }; 
    }
    
    return { success: false, errors: 'An unexpected error occurred.' };
  }
};
