import { Request } from "express";
import cloudinary from "../configs/cloudinary"
import fileUpload from "express-fileupload";

export const uploadUserPhotoProfile = async () => {
    const result = await cloudinary.uploader.upload('', {
        folder: "user profile"
    });
}

export const uploadRoomImage = async (file: fileUpload.UploadedFile) => {
    try {
        
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "rooms",
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
}

export const deleteCloudinaryImage = async (publicId: string) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId)

        // keep returning success if image not found
        return {
            success: true,
            code: 200,
            result: null
        }

        if(response.result === 'ok') {
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