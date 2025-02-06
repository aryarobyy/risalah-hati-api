import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "../utils/response";

const prisma = new PrismaClient();

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.status(200).json(successResponse(blogs));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getDetailBlog = async (req: Request, res: Response) => {
    try {
        const { id: blogId } = req.params;
        const id = Number(blogId);

        const blog = await prisma.blog.findUnique({
            where: {
                id
            }
        });

        if (!blog) {
            res.status(404).json(errorResponse(404, 'not found', "Data Not Found", "Blog Not Found"))
            return;
        };
        res.status(200).json(successResponse(blog));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const postBlog = async  (req: Request, res: Response) => {
    try {
        const {authorId, title, content, image, createdBy, type} = req.body;

        const blog = await prisma.blog.create({
            data: {
                authorId,
                title,
                content,
                image,
                createdBy,
                type
            },
        })

        res.status(200).json(successResponse(blog))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const {id: blogId} = req.params;
        const id = Number(blogId)
        const {title, content, image, type} = req.body;
        
        const blog = await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                content,
                image,
                type
            }
        },)

        res.status(200).json(successResponse(blog))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }    
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const {id: blogId} = req.params;
        const id = Number(blogId);

        await prisma.blog.delete({
            where: {
                id
            }
        })

        res.status(200).json(successResponse(null, "Blog Deleted!"))

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}
