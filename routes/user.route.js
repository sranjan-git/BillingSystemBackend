import express from 'express';
import { getUser, addUser, updateAssets } from '../controller/user.controller.js';

const router = express.Router();

router.post('/add', addUser);
router.get('/get/:firebaseId', getUser); 
router.put('/updateAssets', updateAssets); 

export default router;
