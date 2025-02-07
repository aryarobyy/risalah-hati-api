import { NextFunction, Request, Response } from "express";
import { loginUserSchema, registUserSchema, updateUserSchema } from "../zodSchema/userSchema";
import { errorResponse } from "../utils/response";

export const validateRegist = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = registUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };
        next()
    } catch (error) {
        next(error)
    }
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = updateUserSchema.safeParse(req.body);
    
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };
        
        next()
    } catch (error) {
        next(error)
    }
}

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = loginUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        }
        next()
    } catch (error) {
        next(error)
    }
}