import express from "express";
import { deleteUser, getDetailUser, getUsers, loginUser, postUser, updateUser } from "../controllers/user.controller";
import { deleteUserMiddleware, loginUserMiddleware, registUserMiddleware, updateUserMiddleware } from "../middlewares/users";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getDetailUser)
router.post('/', registUserMiddleware, postUser);
router.put('/:id', updateUserMiddleware, updateUser);
router.delete('/:id', deleteUserMiddleware, deleteUser);
router.post('/login', loginUserMiddleware, loginUser);

export default router;