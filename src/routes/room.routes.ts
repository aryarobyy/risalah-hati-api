import { Router } from "express";
import { deleteRoom, getDetailRoom, getRooms, postRoom, updateRoom } from "../controllers/room.controller";
import { validateAddRoom } from "../middlewares/room";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getDetailRoom);
router.post("/post", validateAddRoom, postRoom);
router.put("/:id", validateAddRoom, updateRoom);
router.delete("/:id", deleteRoom);

export default router;