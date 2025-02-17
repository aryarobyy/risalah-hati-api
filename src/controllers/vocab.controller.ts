import { Prisma } from "@prisma/client";
import prisma from "../configs/prismaClient";
import { errorResponse, successResponse } from "../utils/response";
import { Request, Response } from "express";

export const getAllVocab = async (req: Request, res: Response) => {
    try {
        const signCode = Array.isArray(req.query.signCode) ? req.query.signCode[0] : req.query.signCode;

        const whereClouse: Prisma.VocabWhereInput = signCode ? { signCode } : {};
        
        const vocabs = await prisma.vocab.findMany({
            where: whereClouse
        });
        res.status(200).json(successResponse(vocabs));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getVocab = async (req: Request, res: Response) => {
    try {
        const { id: vocabId } = req.params;
        const id = Number(vocabId);

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

export const getVocabsBySignCode = async (req: Request, res: Response) => {
    try {
        const { signCode } = req.params;
        const vocabs = await prisma.vocab.findMany({
            where: {
                signCode: signCode
            },
        });

        res.status(200).json(successResponse(vocabs));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage);
        res.status(500).json(
            errorResponse(500, 'Internal Server Error', error, errMessage)
        );
    }
}

export const postVocab = async (req: Request, res: Response) => {
    try {
        const { name, image, signCode } = req.body;

        const vocab = await prisma.vocab.create({
            data: {
                name,
                image,
                signCode,
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
        const id = Number(vocabId);

        const { name, image, signCode } = req.body;

        const response = await prisma.vocab.update({
            where: {
                id
            },
            data: {
                name,
                image,
                signCode
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
        const { id: vocabId } = req.params;
        const id = Number(vocabId);


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