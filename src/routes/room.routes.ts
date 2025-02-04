import { Router } from "express";
import { deleteRoom, getDetailRoom, getRooms, postRoom, updateRoom } from "../controllers/room.controller";

const router = Router();

router.post("/post", postRoom);
router.get("/", getRooms);
router.get("/:id", getDetailRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;