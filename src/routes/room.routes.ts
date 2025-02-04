import { Router } from "express";
import { getDetailRoom, getRooms } from "../controllers/room.controller";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getDetailRoom);

export default router;