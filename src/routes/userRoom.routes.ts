import { Router } from "express";
import { getRoomUser, getUserRoom, postUserRoom } from "../controllers/userRoom.controller";

const router = Router();

router.get('/user/:id', getUserRoom)
router.get('/room/:id', getRoomUser)
router.post('/', postUserRoom)

export default router;