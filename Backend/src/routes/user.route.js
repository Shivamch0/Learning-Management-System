import express from 'express';
import { getUserData, userEnrolledCourses } from '../controller/user.controller.js';

const router = express.Router();

router.get('/data' , getUserData)
router.get('/enrolled-courses' , userEnrolledCourses)

export default router;