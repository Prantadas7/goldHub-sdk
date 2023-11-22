import express from 'express';
import { callback, logout, me } from "./entity";
const router = express.Router();

router.get('/callback', callback);
router.get('/me', me);
router.post('/logout', logout);


export default router;