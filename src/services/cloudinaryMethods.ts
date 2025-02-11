import { PrismaClient } from "@prisma/client";
import cloudinary from "../configs/cloudinary"
import fileUpload from "express-fileupload";
import { getPublicIdFromUrl } from "../utils/strings";


export const uploadCloudinaryImage = async (file: fileUpload.UploadedFile, folderPath: string) => {
    try {

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: folderPath,
        });

        return {
            success: true,
            code: 200,
            result
        };
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return {
            success: false,
            code: 500,
            error: error,
            errorMessage: errMessage
        }
    }
};

export const deleteCloudinaryImage = async (publicId: string) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId)

        // keep returning success if image not found
        return {
            success: true,
            code: 200,
            result: null
        }

        if (response.result === 'ok') {
        }

        return {
            success: false,
            code: 404,
            error: "Failed to delete image",
            errorMessage: "Failed to delete image, image not found!"
        }
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return {
            success: false,
            code: 500,
            error: error,
            errorMessage: errMessage
        }
    }

}

export const deleteUserRoomsImage = async (authorId: string) => {
    try {
        const prisma = new PrismaClient();
        const userRooms = await prisma.room.findMany({
            where: {
                authorId
            }
        })

        if (userRooms.length > 0) {
            userRooms.forEach(async room => {
                const publicId = getPublicIdFromUrl(room.image);
                if (publicId) {
                    await deleteCloudinaryImage(publicId);
                }

            })
        }
        return {
            success: true,
            code: 200,
            result: null
        }
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return {
            success: false,
            code: 500,
            error: error,
            errorMessage: errMessage
        }
    }

}