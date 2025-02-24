import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../configs/prismaClient";

export const postUserRoom = async (req: Request, res: Response) => {
    try{
        const {userId, roomId} = req.body;

        const data = await prisma.userRoom.create({
            data: {
                userId,
                roomId,
            },
            select: {
                userId: true,
                roomId: true,
            }
        });

        res.status(200).json(
            successResponse(data)
        )
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(
            errorResponse(500, 'Internal Server Error', error, errMessage)
        )
    }
}

export const getUserRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await prisma.userRoom.findMany({
            where: {
                userId: id
            },
            include: {
                room: true
            }
        })
        res.status(200).json(successResponse(data));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const getRoomUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await prisma.userRoom.findMany({
            where: {
                roomId: id
            },
            include: {
                user: true
            }
        })
        res.status(200).json(successResponse(data));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}