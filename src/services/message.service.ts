import prisma from "../configs/prismaClient"
import { addRoomMessage } from "../zodSchema/roomMessasge";

export const getRoomMessageByRoomId = async (roomId: string) => {
    try {
        const messages = await prisma.roomMessage.findMany({
            where: {
                roomId
            },
            include: {
                sender: true
            },
            orderBy: {
                "createdAt": "asc"
            }
        });

        return messages;
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
    }
};

export const postMessage = async (data: { senderId: string; roomId: string; content: string }) => {
    try {
        const result = addRoomMessage.safeParse(data);
        if (!result.success) {
            console.error(result.error)
            return;
        };

        const newMessage = await prisma.roomMessage.create({
            data,
            include: {
                sender: true
            }
        });

        return newMessage;
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
    }
}