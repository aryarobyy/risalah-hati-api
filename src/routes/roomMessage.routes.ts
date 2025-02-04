import { Router } from "express";
import { deleteRoomMessage, getAllRoomMessage, getRoomMessages, postRoomMessage, updateRoomMessage } from "../controllers/roomMessage.controller";

const router = Router();

router.get('/', getAllRoomMessage);
router.get('/:id', getRoomMessages);
router.post('/', postRoomMessage);
router.put('/:id', updateRoomMessage);
router.delete('/:id', deleteRoomMessage);

export default router;