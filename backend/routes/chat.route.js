import express from 'express';
import { getChatResponse } from './../controllers/chat.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/chat', getChatResponse);

export default router;
