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
            }
        });

        return messages;
    } catch (error) {
        // ntaran
    }
};

export const postMessage = async (data: { senderId: string; roomId: string; content: string }) => {
    try {
        const result = addRoomMessage.safeParse(data);
        if(!result.success) {
            console.error(result.error)
        };

        const newMessage = await prisma.roomMessage.create({
            data,
            include: {
                sender: true
            }
        });
        console.log(newMessage)

        return newMessage;
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
    }
}