import { NextFunction, Request, Response } from "express";
import { deleteUserSchema, loginUserSchema, registUserSchema, updateUserSchema } from "../zodSchema/userSchema";
import { errorResponse } from "../utils/response";
import { deleteCloudinaryImage, uploadCloudinaryImage } from "../utils/cloudinaryMethods";
import fileUpload from "express-fileupload";
import { getPublicIdFromUrl } from "../utils/strings";

export const registUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export const updateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = updateUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        // jika ada update profile picture
        if (req.files) {
            if (!req.files.newProfilePic) {
                console.error("No new profile picture file uploaded!");
                res.status(400).json(errorResponse(400, 'Bad Request', "Bad Request", "No new profile picture file uploaded!"));
                return
            };

            const responseUpload = await uploadCloudinaryImage(req.files.newProfilePic as fileUpload.UploadedFile, "profile picture");

            if (req.body.profilePic) {
                const publicId = getPublicIdFromUrl(req.body.profilePic);
                if (publicId) {
                    const responseDelete = await deleteCloudinaryImage(publicId);
                    if (!responseDelete.success) {
                        console.error(responseDelete.errorMessage);
                        res.status(responseDelete.code).json(errorResponse(responseDelete.code, 'Internal Server Error', responseDelete.error, responseDelete.errorMessage || ""))
                        return;
                    };
                };
            };

            if (!responseUpload.success) {
                console.error(responseUpload.errorMessage);
                res.status(responseUpload.code).json(errorResponse(responseUpload.code, "", responseUpload.error, responseUpload.errorMessage || ""))
                return;
            };

            req.body.profilePic = responseUpload.result?.secure_url;
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const loginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
};

export const deleteUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = deleteUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        }

        const publicId = getPublicIdFromUrl(req.body.profilePic);
        if (publicId) {
            const responseDelete = await deleteCloudinaryImage(publicId);
            if (!responseDelete.success) {
                console.error(responseDelete.errorMessage);
                res.status(responseDelete.code).json(errorResponse(responseDelete.code, 'Internal Server Error', responseDelete.error, responseDelete.errorMessage || ""))
                return;
            };
        };
        next()
    } catch (error) {
        next(error)
    }
}