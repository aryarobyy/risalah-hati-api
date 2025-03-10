import { NextFunction, Request, Response } from "express";
import { deleteUserSchema, loginUserSchema, registUserSchema, updateUserSchema, verifyUserTokenSchema } from "../zodSchema/userSchema";
import { errorResponse } from "../utils/response";
import { deleteCloudinaryImage, deleteUserRoomsImage, uploadCloudinaryImage } from "../services/cloudinaryMethods";
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
        res.status(400).json(
        errorResponse(
            400,
            'Bad Request',
            result.error,
            result.error.issues[0].message
        )
        );
        return;
    }

    if (req.files) {
        if (!req.files.newProfilePic && !req.files.newBannerPic) {
        console.error("No new file uploaded for profilePic or bannerPic!");
        res.status(400).json(
            errorResponse(
            400,
            'Bad Request',
            "Bad Request",
            "No new file uploaded for profilePic or bannerPic!"
            )
        );
        return;
        }

        if (req.files.newProfilePic) {
        const responseUpload = await uploadCloudinaryImage(
            req.files.newProfilePic as fileUpload.UploadedFile,
            "profile-picture"
        );

        if (req.body.profilePic) {
            const publicId = getPublicIdFromUrl(req.body.profilePic);
            if (publicId) {
            const responseDelete = await deleteCloudinaryImage(publicId);
            if (!responseDelete.success) {
                console.error(responseDelete.errorMessage);
                res.status(responseDelete.code).json(
                errorResponse(
                    responseDelete.code,
                    'Internal Server Error',
                    responseDelete.error,
                    responseDelete.errorMessage || ""
                )
                );
                return;
            }
            }
        }

        if (!responseUpload.success) {
            console.error(responseUpload.errorMessage);
            res.status(responseUpload.code).json(
            errorResponse(
                responseUpload.code,
                "",
                responseUpload.error,
                responseUpload.errorMessage || ""
            )
            );
            return;
        }

        req.body.profilePic = responseUpload.result?.secure_url;
        }

        if (req.files.newBannerPic) {
        const responseUploadBanner = await uploadCloudinaryImage(
            req.files.newBannerPic as fileUpload.UploadedFile,
            "banner-picture"
        );

        if (req.body.bannerPic) {
            const publicIdBanner = getPublicIdFromUrl(req.body.bannerPic);
            if (publicIdBanner) {
            const responseDeleteBanner = await deleteCloudinaryImage(publicIdBanner);
            if (!responseDeleteBanner.success) {
                console.error(responseDeleteBanner.errorMessage);
                res.status(responseDeleteBanner.code).json(
                errorResponse(
                    responseDeleteBanner.code,
                    'Internal Server Error',
                    responseDeleteBanner.error,
                    responseDeleteBanner.errorMessage || ""
                )
                );
                return;
            }
            }
        }

        if (!responseUploadBanner.success) {
            console.error(responseUploadBanner.errorMessage);
            res.status(responseUploadBanner.code).json(
            errorResponse(
                responseUploadBanner.code,
                "",
                responseUploadBanner.error,
                responseUploadBanner.errorMessage || ""
            )
            );
            return;
        }
        req.body.bannerPic = responseUploadBanner.result?.secure_url;
        }
    }
    next();
    } catch (error) {
    next(error);
    }
  };
  

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

        if (req.body.profilePic) {
            const publicId = getPublicIdFromUrl(req.body.profilePic);
            console.log(publicId);
            if (publicId) {
                const responseDelete = await deleteCloudinaryImage(publicId);
                if (!responseDelete.success) {
                    console.error(responseDelete.errorMessage);
                    res.status(responseDelete.code).json(errorResponse(responseDelete.code, 'Internal Server Error', responseDelete.error, responseDelete.errorMessage || ""))
                    return;
                };
            };
        };

        await deleteUserRoomsImage(req.params.id);
        // if (!response.success) {
        //     console.error(response.errorMessage);
        //     res.status(response.code).json(errorResponse(response.code, 'Internal Server Error', response.error, response.errorMessage || ""))
        //     return;
        // }

        next()
    } catch (error) {
        next(error)
    }
};

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = verifyUserTokenSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(errorResponse(400, 'Bad Request', result.error, result.error.issues[0].message))
            return;
        };
        next()
    } catch (error) {
        next(error)
    }
}