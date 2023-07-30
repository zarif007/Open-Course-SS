import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.get('/', CourseController.getCourses);
router.get('/:id', CourseController.getSingleCourse);
router.post('/', CourseController.createCourse);
router.delete('/:id');
router.patch('/:id', CourseController.updateCourse);

export const CourseRoutes = router;
