import express from 'express';
import { loginUser, logoutUser, pingServer, registerUser } from '../controllers/user.controller.js';
const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get("/ping", pingServer);
export default router;
