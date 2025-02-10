import { z } from "zod";

export const addBlogSchema = z.object({
    authorId: z.string({
        message: "Author ID is required"
    }),
    title: z.string({
        message: "Title is required"
    }).max(255, { message: "Title must not exceed 255 characters." }),
    content: z.string({
        message: "Content is required"
    }).max(255, { message: "Content must not exceed 255 characters." }),
    createdBy: z.string({
        message: "Created by is required"
    }).max(255, { message: "Created by must not exceed 255 characters." }),
    type: z.enum(["ARTICLE", "NEWS", "EVENT"], {
        message: "Type of blog should be (ARTICLE/NEWS/EVENT)"
    })
})

export const updateBlogSchema = z.object({
    title: z.string({
        message: "Title is required"
    }).max(255, { message: "Title must not exceed 255 characters." }),
    content: z.string({
        message: "Content is required"
    }).max(255, { message: "Content must not exceed 255 characters." }),
    type: z.enum(["ARTICLE", "NEWS", "EVENT"], {
        message: "Type of blog should be (ARTICLE/NEWS/EVENT)"
    }),
    image: z.string({
        message: "Image is required"
    })
});

export const deleteBlogSchema = z.object({
    image: z.string({
        message: "Image is required."
    })
})