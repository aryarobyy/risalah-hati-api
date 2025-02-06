import { z } from "zod";

export const addRoomSchema = z.object({
    title: z.string({
        message: "Title is required."
    }).max(255, { message: "Title must not exceed 255 characters." }),
    description: z.string().optional(),
    image: z.string({
        message: "Image is required."
    }).max(255, { message: "Username must not exceed 255 characters." }),
})