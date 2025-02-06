import { NextFunction, Request, Response } from "express";
import { addRoomSchema } from "../zodSchema/roomSchema";
import { errorResponse } from "../utils/response";

export const validateAddRoom =  (req: Request, res: Response, next: NextFunction) => {
    const result = addRoomSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
        return;
    }
    next()
}