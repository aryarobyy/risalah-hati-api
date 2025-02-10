import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "../utils/response";
import { Request, Response } from "express";

const prisma = new PrismaClient();


export const getAllVocab = async (req: Request, res: Response) => {
    try {
        const vocabs = await prisma.vocab.findMany();
        res.status(200).json(successResponse(vocabs))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getVocab = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const vocab = await prisma.vocab.findUnique({
            where: {
                id
            }
        });

        if (!vocab) {
            res.status(404).json(errorResponse(404, 'not found', "Data Not Found", "Vocab Not Found"))
            return;
        };

        res.status(200).json(successResponse(vocab));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const postVocab = async (req: Request, res: Response) => {
    try {
        const { id, name, image } = req.body;

        const vocab = await prisma.vocab.create({
            data: {
                id,
                name,
                image
            }
        });

        res.status(200).json(successResponse(vocab));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const updateVocab = async (req: Request, res: Response) => {
    try {
        const { id: vocabId } = req.params;

        const { id, name, image } = req.body;

        const response = await prisma.vocab.update({
            where: {
                id: vocabId
            },
            data: {
                id,
                name,
                image
            }
        });

        res.status(200).json(successResponse(response));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const deleteVocab = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await prisma.vocab.delete({
            where: {
                id
            }
        });

        res.status(200).json(successResponse(null, `${response.name} deleted!`))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}