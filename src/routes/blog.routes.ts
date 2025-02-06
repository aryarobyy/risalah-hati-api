import { Router } from "express";
import { deleteBlog, getBlogs, getDetailBlog, postBlog, updateBlog } from "../controllers/blog.controller";
const router = Router();

router.get('/', getBlogs)
router.get('/:id', getDetailBlog)
router.post('/', postBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router;
