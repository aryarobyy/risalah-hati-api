import { z } from "zod";

export const addVocabSchema = z.object({
    id: z.string().regex(/^vocab/, {
        message: "ID must start with 'vocab'!"
    }),
    name: z.string({
        message: "Name of vocab is required!"
    })
});

export const updateVocabSchema = z.object({
    id: z.string().regex(/^vocab/, {
        message: "ID must start with 'vocab'!"
    }),
    name: z.string({
        message: "Name of vocab is required!"
    }),
    image: z.string({
        message: "Image is required!"
    })
});

export const deleteVocabSchema = z.object({
    image: z.string({
        message: "Image is required!"
    })
})