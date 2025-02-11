import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { deleteCloudinaryImage, uploadCloudinaryImage } from "../services/cloudinaryMethods";
import { getPublicIdFromUrl } from "../utils/strings";
import fileUpload from "express-fileupload";
import { addBlogSchema, deleteBlogSchema, updateBlogSchema } from "../zodSchema/blogSchema";

export const addBlogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = addBlogSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        if (!req.files?.image) {
            res.status(400).json(errorResponse(400, 'Bad Request', "Bad Request", "No image file uploaded"));
            return;
        };

        const response = await uploadCloudinaryImage(req.files.image as fileUpload.UploadedFile, 'blogs')
        if (!response.success) {
            res.status(response.code).json(errorResponse(response.code, "", response.error, response.errorMessage || ""))
            return;
        };
        req.body.image = response.result?.secure_url;

        next()
    } catch (error) {
        next(error);
    }
}

export const updateBlogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = updateBlogSchema.safeParse(req.body);
        if (!result.success) {
            console.error(result.error.issues[0].message);
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };

        // klo ada update image
        if (req.files) {
            if (!req.files.newImage) {
                console.error("No new image file uploaded!");
                res.status(400).json(errorResponse(400, 'Bad Request', "Bad Request", "No new image file uploaded"));
                return;
            };

            const responseUpload = await uploadCloudinaryImage(req.files.newImage as fileUpload.UploadedFile, 'blogs');

            const publicId = getPublicIdFromUrl(req.body.image);
            if (publicId) {
                const responseDelete = await deleteCloudinaryImage(publicId);
                if (!responseDelete.success) {
                    console.error(responseDelete.errorMessage);
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

export const deleteBlogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = deleteBlogSchema.safeParse(req.body);
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
            };
        };

        next()
    } catch (error) {
        next(error)
    }
}