import express from 'express';
import { addMood, deleteMood, getMoods } from '../controllers/mood.controller.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();

router.post('/create', authenticate, addMood)
router.get('/fetch', authenticate, getMoods)
router.delete('/delete/:id', authenticate, deleteMood)
export default router;
