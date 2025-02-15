import { Router } from "express";
import { deleteVocab, getAllVocab, getVocab, getVocabsBySignCode, postVocab, updateVocab } from "../controllers/vocab.controller";
import { addVocabMiddleware, deleteVocabMiddleware, updateVocabMiddleware } from "../middlewares/vocab";


const router = Router();

router.get('/', getAllVocab);
router.get('/:id', getVocab);
router.get('/get/:signCode', getVocabsBySignCode);
router.post('/', addVocabMiddleware, postVocab);
router.put('/:id', updateVocabMiddleware, updateVocab);
router.delete('/:id', deleteVocabMiddleware, deleteVocab);

export default router;