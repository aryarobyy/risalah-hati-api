import { Router } from "express";
import { deleteBlog, getBlogs, getDetailBlog, postBlog, updateBlog } from "../controllers/blog.controller";
import { addBlogMiddleware, deleteBlogMiddleware, updateBlogMiddleware } from "../middlewares/blog";
const router = Router();

router.get('/', getBlogs)
router.get('/:id', getDetailBlog)
router.post('/', addBlogMiddleware, postBlog)
router.put('/:id', updateBlogMiddleware, updateBlog)
router.delete('/:id', deleteBlogMiddleware, deleteBlog)

export default router;
