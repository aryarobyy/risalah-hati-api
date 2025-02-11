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
            // do something
        };

        const newMessage = await prisma.roomMessage.create({
            data,
            include: {
                sender: true
            }
        });

        return newMessage;
    } catch (error) {
        // 
    }
}