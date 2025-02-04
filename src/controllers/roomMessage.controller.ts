import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";

const prisma = new PrismaClient();

export const getAllRoomMessage = async (req: Request, res: Response) => {
    try {
        const messages = await prisma.roomMessage.findMany();
        res.status(200).json(successResponse(messages))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const getRoomMessages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const messages = await prisma.roomMessage.findMany({
            where: {
                id
            }
        });
        res.status(200).json(successResponse(messages));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const postRoomMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, roomId, content } = req.body;

        const message = await prisma.roomMessage.create({
            data: {
                roomId,
                senderId,
                content
            }
        })

        res.status(200).json(
            successResponse(message)
        );
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const updateRoomMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedMessage = await prisma.roomMessage.update({
            where: {
                id
            },
            data: {
                content
            }
        });

        res.status(200).json(successResponse(updatedMessage));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(
            errorResponse(500, 'Internal Server Error', error, errMessage)
        )
    }
}

export const deleteRoomMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await prisma.roomMessage.delete({
            where: {
                id
            }
        });

        res.status(200).json(successResponse(null, 'Message deleted'));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(
            errorResponse(500, 'Internal Server Error', error, errMessage)
        )
    }
}