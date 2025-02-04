import express from "express";
import { deleteUser, getDetailUser, getUsers, loginUser, postUser, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getDetailUser)
router.post('/', postUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;