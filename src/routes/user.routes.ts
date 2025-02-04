import express from "express";
import { deleteUser, getDetailUser, getUsers, loginUser, postUser, updateUser } from "../controllers/user.controller";
import { validateLoginUser, validateRegist, validateUpdateUser } from "../middlewares/users";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getDetailUser)
router.post('/', validateRegist, postUser);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);
router.post('/login', validateLoginUser, loginUser);

export default router;