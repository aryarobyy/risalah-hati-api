import { z } from "zod";

export const addVocabSchema = z.object({
    name: z.string({
        message: "Name of vocab is required!"
    }),
    signCode: z.string({
        message: "Sign Code is required"
    })
});

export const updateVocabSchema = z.object({
    name: z.string({
        message: "Name of vocab is required!"
    }),
    image: z.string({
        message: "Image is required!"
    }),
    signCode: z.string({
        message: "Sign Code is required"
    })
});

export const deleteVocabSchema = z.object({
    image: z.string({
        message: "Image is required!"
    })
})