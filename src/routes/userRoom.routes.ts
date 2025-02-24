import { Router } from "express";
import { getRoomUser, getUserRoom, postUserRoom } from "../controllers/userRoom.controller";

const router = Router();

router.get('/user/:id', getUserRoom) // for getting user that joining wich room
router.get('/room/:id', getRoomUser) // ini buat ngecek user mana aja di suatu room
router.post('/', postUserRoom)

export default router;