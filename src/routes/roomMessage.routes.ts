import { Router } from "express";
import { deleteRoomMessage, getAllRoomMessage, getRoomMessageByRoomId, getRoomMessages, postRoomMessage, updateRoomMessage } from "../controllers/roomMessage.controller";

const router = Router();

router.get('/', getAllRoomMessage);
router.get('/:id', getRoomMessages);
router.post('/', postRoomMessage);
router.put('/:id', updateRoomMessage);
router.delete('/:id', deleteRoomMessage);
// router.get('/:roomId', getRoomMessageByRoomId);

export default router;