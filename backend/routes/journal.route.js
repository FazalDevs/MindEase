import { Router } from "express";
import express from "express";
import { createJournal, deleteJournal, editJournal, fetchJournal } from "../controllers/journal.controller.js";
const router = express.Router();


router.get('/fetch', fetchJournal);
router.post('/create', createJournal);
router.post('/edit/:id', editJournal);
router.delete('/delete/:id', deleteJournal);
export default router;