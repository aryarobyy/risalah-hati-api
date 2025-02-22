import express from "express";
import { deleteUser, getDetailUser, getUserByEmail, getUserByUsername, getUsers, loginUser, postUser, updateUser, verifyTokenUser } from "../controllers/user.controller";
import { deleteUserMiddleware, loginUserMiddleware, registUserMiddleware, updateUserMiddleware, verifyTokenMiddleware } from "../middlewares/users";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getDetailUser)
router.get('/username/:username', getUserByUsername)
router.get('/email/:email', getUserByEmail)
router.post('/', registUserMiddleware, postUser);
router.put('/:id', updateUserMiddleware, updateUser);
router.delete('/:id', deleteUserMiddleware, deleteUser);
router.post('/login', loginUserMiddleware, loginUser);
router.post('/verify-token', verifyTokenMiddleware, verifyTokenUser)

export default router;