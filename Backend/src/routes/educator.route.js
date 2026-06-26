import express from 'express';
import { updateRoleEducator } from '../controller/educator.controller.js';

const router = express.Router();

router.get('/update-role' , updateRoleEducator);

export default router;