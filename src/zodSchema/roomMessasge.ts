import { z } from "zod";

export const addRoomMessage = z.object({
    senderId: z.string({
        message: "Sender ID is required!"
    }),
    roomId: z.string({
        message: "Room ID is required!"
    }),
    content: z.string({
        message: "Content of message is required!"
    })
})