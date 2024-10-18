import { NextFunction, Request, Response } from "express";
import config from "../infrastructure/config";
import { HttpException } from "./exception";

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