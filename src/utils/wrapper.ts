import { Response } from "express";

export const responseError = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({
        message,
        data: null
    });
};

export const responseSuccess = (res: Response, statusCode: number, message: string, data: void | object | null) => {
    res.status(statusCode).json({
        message,
        data
    });
};

