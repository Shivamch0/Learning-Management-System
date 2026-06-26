import express from 'express';
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleEducator } from '../controller/educator.controller.js';
import upload from '../config/multer.js';
import { protectEducator } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/update-role' , updateRoleEducator);

router.post('/add-course' , upload.single('image') , protectEducator , addCourse);

router.get('/courses' , protectEducator , getEducatorCourses);
router.get('/dashboard' , protectEducator , educatorDashboardData);
router.get('/enrolled-students' , protectEducator , getEnrolledStudentsData);

export default router;