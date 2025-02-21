import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../configs/prismaClient";

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
                roomId: id
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
            },
            select: {
                id: true,
                roomId: true,
                senderId: true,
                content: true,
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
            },
            select: {
                id: true,
                roomId: true,
                senderId: true,
                content: true,
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

export const getLatestMessage = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const latestMessage = await prisma.roomMessage.findFirst({
            where: {
                roomId: id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(successResponse(latestMessage));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage);
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage));
    }
};
