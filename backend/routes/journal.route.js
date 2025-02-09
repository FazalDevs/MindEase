import { Router } from "express";
import express from "express";
import { createJournal, deleteJournal, editJournal, fetchJournal } from "../controllers/journal.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();


router.get('/fetch', authenticate, fetchJournal);
router.post('/create', authenticate, createJournal);
router.post('/edit/:id', authenticate, editJournal);
router.delete('/delete/:id', authenticate, deleteJournal);
export default router;