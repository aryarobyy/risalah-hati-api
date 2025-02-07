import { z } from "zod";

export const addRoomSchema = z.object({
    authorId: z.string({
        message: "Author ID is required"
    }),
    title: z.string({
        message: "Title is required."
    }).max(255, { message: "Title must not exceed 255 characters." }),
    description: z.string().optional(),
});

export const updateRoomSchema = z.object({
    title: z.string({
        message: "Title is required."
    }).max(255, { message: "Title must not exceed 255 characters." }),
    description: z.string().optional(),
    image: z.string({
        message: "Image is required."
    })
});

export const deleteRoomSchema = z.object({
    image: z.string({
        message: "Image is required."
    })
})