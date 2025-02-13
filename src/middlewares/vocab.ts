import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { deleteCloudinaryImage, uploadCloudinaryImage } from "../services/cloudinaryMethods";
import { getPublicIdFromUrl } from "../utils/strings";
import fileUpload from "express-fileupload";
import { addVocabSchema, deleteVocabSchema, updateVocabSchema } from "../zodSchema/vocabSchema";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const addVocabMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = addVocabSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        if (!req.files?.image) {
            res.status(400).json(errorResponse(400, 'Bad Request', "Bad Request", "No image file uploaded"));
            return;
        };

        const response = await uploadCloudinaryImage(req.files.image as fileUpload.UploadedFile, "vocabs");
        if (!response.success) {
            res.status(response.code).json(errorResponse(response.code, "", response.error, response.errorMessage || ""))
            return;
        };

        req.body.image = response.result?.secure_url
        next()
    } catch (error) {
        next(error)
    }
};

export const updateVocabMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = updateVocabSchema.safeParse(req.body);
        if (!result.success) {
            console.error(result.error.issues[0].message);
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        // kalo ada update image vocab
        if (req.files) {
            if (!req.files.newImage) {
                console.error("No new image file uploaded!");
                res.status(400).json(errorResponse(400, 'Bad Request', "Bad Request", "No new image file uploaded"));
                return;
            };

            const responseUpload = await uploadCloudinaryImage(req.files.newImage as fileUpload.UploadedFile, 'vocabs');

            const publicId = getPublicIdFromUrl(req.body.image);
            if (publicId) {
                const responseDelete = await deleteCloudinaryImage(publicId);
                if (!responseDelete.success) {
                    console.error(responseDelete.errorMessage);
                    res.status(responseDelete.code).json(errorResponse(responseDelete.code, 'Internal Server Error', responseDelete.error, responseDelete.errorMessage || ""))
                    return;
                };
            };

            if (!responseUpload.success) {
                console.error(responseUpload.errorMessage);
                res.status(responseUpload.code).json(errorResponse(responseUpload.code, "", responseUpload.error, responseUpload.errorMessage || ""))
                return;
            };

            req.body.image = responseUpload.result?.secure_url;
        }

        next()
    } catch (error) {
        next(error)
    }
};

export const deleteVocabMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = deleteVocabSchema.safeParse(req.body);
        if (!result.success) {
            console.error(result.error.issues[0].message);
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        const publicId = getPublicIdFromUrl(req.body.image);
        if (publicId) {
            const responseDelete = await deleteCloudinaryImage(publicId);
            if (!responseDelete.success) {
                console.error(responseDelete.errorMessage);
                res.status(responseDelete.code).json(errorResponse(responseDelete.code, 'Internal Server Error', responseDelete.error, responseDelete.errorMessage || ""))
                return;
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}